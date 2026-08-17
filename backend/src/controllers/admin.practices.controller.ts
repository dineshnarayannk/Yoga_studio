import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const getPractices = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM yoga_practices ORDER BY display_order ASC, created_at DESC'
      );
      res.json({ success: true, data: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching practices:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch practices' });
  }
};

export const getPracticeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM yoga_practices WHERE id = ?',
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Practice not found' });
      }
      res.json({ success: true, data: rows[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching practice:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch practice' });
  }
};

export const createPractice = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      short_description,
      difficulty,
      duration,
      category,
      image,
      status = 'ACTIVE',
      display_order = 0
    } = req.body;

    if (!name || !description || !short_description || !difficulty || !duration) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO yoga_practices 
        (name, description, short_description, difficulty, duration, category, image, status, display_order) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, description, short_description, difficulty, duration, category || null, image || null, status, display_order]
      );

      const [newRecord] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM yoga_practices WHERE id = ?',
        [result.insertId]
      );

      res.status(201).json({ success: true, data: newRecord[0], message: 'Practice created successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating practice:', error);
    res.status(500).json({ success: false, message: 'Failed to create practice' });
  }
};

export const updatePractice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      short_description,
      difficulty,
      duration,
      category,
      image,
      status,
      display_order
    } = req.body;

    if (!name || !description || !short_description || !difficulty || !duration) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    try {
      // Check if exists
      const [existing] = await connection.query<RowDataPacket[]>('SELECT id FROM yoga_practices WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ success: false, message: 'Practice not found' });
      }

      await connection.query(
        `UPDATE yoga_practices SET 
          name = ?, 
          description = ?, 
          short_description = ?, 
          difficulty = ?, 
          duration = ?, 
          category = ?, 
          image = ?, 
          status = ?, 
          display_order = ? 
        WHERE id = ?`,
        [name, description, short_description, difficulty, duration, category || null, image || null, status || 'ACTIVE', display_order || 0, id]
      );

      const [updatedRecord] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM yoga_practices WHERE id = ?',
        [id]
      );

      res.json({ success: true, data: updatedRecord[0], message: 'Practice updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating practice:', error);
    res.status(500).json({ success: false, message: 'Failed to update practice' });
  }
};

export const deletePractice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
      const [existing] = await connection.query<RowDataPacket[]>('SELECT id FROM yoga_practices WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ success: false, message: 'Practice not found' });
      }

      // We wrap the delete in a try-catch to catch foreign key constraint failures
      try {
        await connection.query('DELETE FROM yoga_practices WHERE id = ?', [id]);
        res.json({ success: true, message: 'Practice deleted successfully' });
      } catch (dbError: any) {
        // If error code is foreign key constraint fails
        if (dbError.code === 'ER_ROW_IS_REFERENCED_2' || dbError.errno === 1451) {
          return res.status(409).json({ 
            success: false, 
            message: 'Cannot delete this practice because it is referenced by existing sessions. Please mark it as INACTIVE instead.' 
          });
        }
        throw dbError; // Re-throw if it's some other DB error
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting practice:', error);
    res.status(500).json({ success: false, message: 'Failed to delete practice' });
  }
};
