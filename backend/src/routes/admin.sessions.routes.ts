import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware';
import {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
} from '../controllers/admin.sessions.controller';

const router = Router();

// Secure all routes
router.use(requireAdmin);

router.get('/', getSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;
