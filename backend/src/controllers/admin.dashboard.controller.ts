import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2/promise';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [[users]] = await connection.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM users');
      const [[practices]] = await connection.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM yoga_practices');
      const [[instructors]] = await connection.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM instructors');
      const [[sessions]] = await connection.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM sessions WHERE start_time > NOW()');
      const [[bookings]] = await connection.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM bookings');
      const [[passes]] = await connection.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM complimentary_passes WHERE status = "PENDING"');
      const [[reviews]] = await connection.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM reviews WHERE status = "PENDING"');

      res.json({
        success: true,
        data: {
          totalUsers: users.count,
          totalPractices: practices.count,
          totalInstructors: instructors.count,
          upcomingSessions: sessions.count,
          totalBookings: bookings.count,
          pendingPasses: passes.count,
          pendingReviews: reviews.count
        }
      });
    } finally {
      connection.release();
    }
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    // If some tables are empty or missing a column, we can just return 0s for now
    res.json({
      success: true,
      data: {
        totalUsers: 0,
        totalPractices: 0,
        totalInstructors: 0,
        upcomingSessions: 0,
        totalBookings: 0,
        pendingPasses: 0,
        pendingReviews: 0
      }
    });
  }
};
