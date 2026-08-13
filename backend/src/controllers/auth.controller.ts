import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const authSecret = process.env.AUTH_SECRET || 'fallback_secret_for_dev';
const COOKIE_NAME = 'token';
const isProd = process.env.NODE_ENV === 'production';

// Helper to set HttpOnly cookie
const setTokenCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd, // secure true in production (requires HTTPS)
    sameSite: isProd ? 'none' : 'lax', // cross-site allowed in prod, lax in dev
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const verifyGoogleAuth = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ success: false, message: 'Google credential is required' });
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ success: false, message: 'Invalid Google token' });
    }

    const { sub: google_id, name, email, picture: profile_image } = payload;

    const connection = await pool.getConnection();
    try {
      // Check if user exists
      const [rows] = await connection.query('SELECT * FROM users WHERE google_id = ?', [google_id]);
      const users = rows as any[];
      let user = users[0];

      if (!user) {
        // New User -> default to USER role, profile_completed = false
        const [result] = await connection.query(
          `INSERT INTO users (google_id, name, email, profile_image, role, profile_completed) 
           VALUES (?, ?, ?, ?, 'USER', false)`,
          [google_id, name, email, profile_image]
        );
        const insertId = (result as any).insertId;
        const [newRows] = await connection.query('SELECT * FROM users WHERE id = ?', [insertId]);
        user = (newRows as any[])[0];
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id }, authSecret, { expiresIn: '7d' });
      setTokenCookie(res, token);

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profile_image: user.profile_image,
          role: user.role,
          profile_completed: Boolean(user.profile_completed)
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Verify Google Auth Error:', error);
    return res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

export const completeProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { name, phone, preferred_practice } = req.body;

    // Basic validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const connection = await pool.getConnection();
    try {
      // Note: we do NOT update role or email or google_id
      await connection.query(
        `UPDATE users SET name = ?, phone = ?, preferred_practice = ?, profile_completed = true WHERE id = ?`,
        [name, phone || null, preferred_practice || null, userId]
      );
      
      const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
      const user = (rows as any[])[0];

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profile_image: user.profile_image,
          role: user.role,
          profile_completed: Boolean(user.profile_completed)
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Complete Profile Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to complete profile' });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  // If requireAuth passes, req.user is populated
  const user = req.user;
  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_image: user.profile_image,
      role: user.role,
      profile_completed: Boolean(user.profile_completed)
    }
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax'
  });
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};
