import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://yoga-studio-gilt.vercel.app' 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import adminPracticesRoutes from './routes/admin.practices.routes';
import adminInstructorsRoutes from './routes/admin.instructors.routes';
import adminDashboardRoutes from './routes/admin.dashboard.routes';
import adminSessionsRoutes from './routes/admin.sessions.routes';

// Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/practices', adminPracticesRoutes);
app.use('/api/admin/instructors', adminInstructorsRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/sessions', adminSessionsRoutes);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Centralized error handling
app.use(errorHandler);

export default app;
