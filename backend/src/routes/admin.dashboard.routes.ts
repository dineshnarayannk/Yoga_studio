import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware';
import { getDashboardStats } from '../controllers/admin.dashboard.controller';

const router = Router();

// Secure routes
router.use(requireAdmin);

router.get('/stats', getDashboardStats);

export default router;
