import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware';
import {
  getPractices,
  getPracticeById,
  createPractice,
  updatePractice,
  deletePractice
} from '../controllers/admin.practices.controller';

const router = Router();

// All routes here are prefixed with /api/admin/practices and require ADMIN role
router.use(requireAdmin);

router.get('/', getPractices);
router.get('/:id', getPracticeById);
router.post('/', createPractice);
router.put('/:id', updatePractice);
router.delete('/:id', deletePractice);

export default router;
