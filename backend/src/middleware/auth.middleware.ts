import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const secret = process.env.AUTH_SECRET || 'fallback_secret_for_dev';
    const decoded = jwt.verify(token, secret) as any;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid authentication token' });
    }

    // Verify user still exists in DB
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
      const users = rows as any[];
      if (users.length === 0) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
      req.user = users[0];
      next();
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  requireAuth(req, res, () => {
    if (req.user && req.user.role === 'ADMIN') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Access denied. Admin role required.' });
    }
  });
};
