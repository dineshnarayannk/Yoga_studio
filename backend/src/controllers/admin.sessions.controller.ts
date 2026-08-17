import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const getSessions = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    try {
      const query = `
        SELECT 
          s.id, 
          s.practice_id, 
          s.instructor_id, 
          DATE_FORMAT(s.session_date, '%Y-%m-%d') as session_date, 
          s.start_time, 
          s.end_time, 
          s.capacity, 
          s.status, 
          s.created_at, 
          s.updated_at,
          p.name as practice_name,
          i.name as instructor_name
        FROM sessions s
        JOIN yoga_practices p ON s.practice_id = p.id
        JOIN instructors i ON s.instructor_id = i.id
        ORDER BY s.session_date ASC, s.start_time ASC
      `;
      const [rows] = await connection.query(query);
      res.json({ success: true, data: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch sessions' });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
      const query = `
        SELECT 
          s.id, 
          s.practice_id, 
          s.instructor_id, 
          DATE_FORMAT(s.session_date, '%Y-%m-%d') as session_date, 
          s.start_time, 
          s.end_time, 
          s.capacity, 
          s.status, 
          s.created_at, 
          s.updated_at,
          p.name as practice_name,
          i.name as instructor_name
        FROM sessions s
        JOIN yoga_practices p ON s.practice_id = p.id
        JOIN instructors i ON s.instructor_id = i.id
        WHERE s.id = ?
      `;
      const [rows] = await connection.query<RowDataPacket[]>(query, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Session not found' });
      }
      res.json({ success: true, data: rows[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch session' });
  }
};

const checkConflicts = async (connection: any, instructor_id: number, session_date: string, start_time: string, end_time: string, exclude_session_id?: string) => {
  let query = `
    SELECT id FROM sessions 
    WHERE instructor_id = ? 
    AND session_date = ? 
    AND status != 'CANCELLED'
    AND (
      (start_time < ? AND end_time > ?) OR
      (start_time >= ? AND start_time < ?)
    )
  `;
  const params: any[] = [instructor_id, session_date, end_time, start_time, start_time, end_time];

  if (exclude_session_id) {
    query += ' AND id != ?';
    params.push(exclude_session_id);
  }

  const [rows] = await connection.query(query, params);
  return rows.length > 0;
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const {
      practice_id,
      instructor_id,
      session_date,
      start_time,
      end_time,
      capacity,
      status = 'SCHEDULED'
    } = req.body;

    if (!practice_id || !instructor_id || !session_date || !start_time || !end_time || capacity === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (start_time >= end_time) {
      return res.status(400).json({ success: false, message: 'Start time must be before end time' });
    }
    
    if (capacity <= 0) {
      return res.status(400).json({ success: false, message: 'Capacity must be greater than 0' });
    }

    const connection = await pool.getConnection();
    try {
      // Validate practice
      const [practices] = await connection.query<RowDataPacket[]>('SELECT status FROM yoga_practices WHERE id = ?', [practice_id]);
      if (practices.length === 0) return res.status(404).json({ success: false, message: 'Practice not found' });
      if (practices[0].status !== 'ACTIVE') return res.status(400).json({ success: false, message: 'Practice is inactive' });

      // Validate instructor
      const [instructors] = await connection.query<RowDataPacket[]>('SELECT status FROM instructors WHERE id = ?', [instructor_id]);
      if (instructors.length === 0) return res.status(404).json({ success: false, message: 'Instructor not found' });
      if (instructors[0].status !== 'ACTIVE') return res.status(400).json({ success: false, message: 'Instructor is inactive' });

      // Check conflicts
      const hasConflict = await checkConflicts(connection, instructor_id, session_date, start_time, end_time);
      if (hasConflict) {
        return res.status(409).json({ success: false, message: 'Instructor already has a session during this time.' });
      }

      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO sessions 
        (practice_id, instructor_id, session_date, start_time, end_time, capacity, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [practice_id, instructor_id, session_date, start_time, end_time, capacity, status]
      );

      const [newRecord] = await connection.query<RowDataPacket[]>(
        `SELECT 
          s.id, s.practice_id, s.instructor_id, DATE_FORMAT(s.session_date, '%Y-%m-%d') as session_date, 
          s.start_time, s.end_time, s.capacity, s.status, s.created_at, s.updated_at,
          p.name as practice_name, i.name as instructor_name
        FROM sessions s
        JOIN yoga_practices p ON s.practice_id = p.id
        JOIN instructors i ON s.instructor_id = i.id
        WHERE s.id = ?`,
        [result.insertId]
      );

      res.status(201).json({ success: true, data: newRecord[0], message: 'Session created successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ success: false, message: 'Failed to create session' });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      practice_id,
      instructor_id,
      session_date,
      start_time,
      end_time,
      capacity,
      status
    } = req.body;

    if (!practice_id || !instructor_id || !session_date || !start_time || !end_time || capacity === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (start_time >= end_time) {
      return res.status(400).json({ success: false, message: 'Start time must be before end time' });
    }

    if (capacity <= 0) {
      return res.status(400).json({ success: false, message: 'Capacity must be greater than 0' });
    }

    const connection = await pool.getConnection();
    try {
      const [existing] = await connection.query<RowDataPacket[]>('SELECT id FROM sessions WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ success: false, message: 'Session not found' });
      }

      // Check conflicts, excluding current session
      const hasConflict = await checkConflicts(connection, instructor_id, session_date, start_time, end_time, id);
      if (hasConflict) {
        return res.status(409).json({ success: false, message: 'Instructor already has a session during this time.' });
      }

      await connection.query(
        `UPDATE sessions SET 
          practice_id = ?, 
          instructor_id = ?, 
          session_date = ?, 
          start_time = ?, 
          end_time = ?, 
          capacity = ?, 
          status = ? 
        WHERE id = ?`,
        [practice_id, instructor_id, session_date, start_time, end_time, capacity, status || 'SCHEDULED', id]
      );

      const [updatedRecord] = await connection.query<RowDataPacket[]>(
        `SELECT 
          s.id, s.practice_id, s.instructor_id, DATE_FORMAT(s.session_date, '%Y-%m-%d') as session_date, 
          s.start_time, s.end_time, s.capacity, s.status, s.created_at, s.updated_at,
          p.name as practice_name, i.name as instructor_name
        FROM sessions s
        JOIN yoga_practices p ON s.practice_id = p.id
        JOIN instructors i ON s.instructor_id = i.id
        WHERE s.id = ?`,
        [id]
      );

      res.json({ success: true, data: updatedRecord[0], message: 'Session updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ success: false, message: 'Failed to update session' });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
      const [existing] = await connection.query<RowDataPacket[]>('SELECT id FROM sessions WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ success: false, message: 'Session not found' });
      }

      // We wrap the delete in a try-catch to catch foreign key constraint failures
      try {
        await connection.query('DELETE FROM sessions WHERE id = ?', [id]);
        res.json({ success: true, message: 'Session deleted successfully' });
      } catch (dbError: any) {
        // ER_ROW_IS_REFERENCED_2 (1451)
        if (dbError.code === 'ER_ROW_IS_REFERENCED_2' || dbError.errno === 1451) {
          return res.status(409).json({ 
            success: false, 
            message: 'Cannot delete this session because there are existing bookings. Please cancel the session instead.' 
          });
        }
        throw dbError;
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ success: false, message: 'Failed to delete session' });
  }
};
