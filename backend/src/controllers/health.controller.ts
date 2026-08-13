import { Request, Response } from 'express';
import { testDatabaseConnection } from '../config/database';

export const checkHealth = async (req: Request, res: Response) => {
  const dbStatus = await testDatabaseConnection();
  
  res.status(200).json({
    success: true,
    message: 'Yoga Studio API is running',
    database: {
      connected: dbStatus.connected,
      name: dbStatus.database
    }
  });
};
