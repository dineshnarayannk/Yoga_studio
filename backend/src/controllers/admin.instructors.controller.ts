import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const getInstructors = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM instructors ORDER BY display_order ASC, created_at DESC'
      );
      res.json({ success: true, data: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch instructors' });
  }
};

export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM instructors WHERE id = ?',
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Instructor not found' });
      }
      res.json({ success: true, data: rows[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching instructor:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch instructor' });
  }
};

export const createInstructor = async (req: Request, res: Response) => {
  try {
    const {
      name,
      bio,
      specialization,
      experience,
      image,
      status = 'ACTIVE',
      display_order = 0
    } = req.body;

    if (!name || !bio || !specialization) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO instructors 
        (name, bio, specialization, experience, image, status, display_order) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, bio, specialization, experience || null, image || null, status, display_order]
      );

      const [newRecord] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM instructors WHERE id = ?',
        [result.insertId]
      );

      res.status(201).json({ success: true, data: newRecord[0], message: 'Instructor created successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ success: false, message: 'Failed to create instructor' });
  }
};

export const updateInstructor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      bio,
      specialization,
      experience,
      image,
      status,
      display_order
    } = req.body;

    if (!name || !bio || !specialization) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    try {
      // Check if exists
      const [existing] = await connection.query<RowDataPacket[]>('SELECT id FROM instructors WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ success: false, message: 'Instructor not found' });
      }

      await connection.query(
        `UPDATE instructors SET 
          name = ?, 
          bio = ?, 
          specialization = ?, 
          experience = ?, 
          image = ?, 
          status = ?, 
          display_order = ? 
        WHERE id = ?`,
        [name, bio, specialization, experience || null, image || null, status || 'ACTIVE', display_order || 0, id]
      );

      const [updatedRecord] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM instructors WHERE id = ?',
        [id]
      );

      res.json({ success: true, data: updatedRecord[0], message: 'Instructor updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating instructor:', error);
    res.status(500).json({ success: false, message: 'Failed to update instructor' });
  }
};

export const deleteInstructor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
      const [existing] = await connection.query<RowDataPacket[]>('SELECT id FROM instructors WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ success: false, message: 'Instructor not found' });
      }

      // We wrap the delete in a try-catch to catch foreign key constraint failures
      try {
        await connection.query('DELETE FROM instructors WHERE id = ?', [id]);
        res.json({ success: true, message: 'Instructor deleted successfully' });
      } catch (dbError: any) {
        // ER_ROW_IS_REFERENCED_2 (1451)
        if (dbError.code === 'ER_ROW_IS_REFERENCED_2' || dbError.errno === 1451) {
          return res.status(409).json({ 
            success: false, 
            message: 'Cannot delete this instructor because they are assigned to existing sessions. Please mark their status as INACTIVE instead.' 
          });
        }
        throw dbError;
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting instructor:', error);
    res.status(500).json({ success: false, message: 'Failed to delete instructor' });
  }
};
