import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware';
import {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor
} from '../controllers/admin.instructors.controller';

const router = Router();

// Secure all routes
router.use(requireAdmin);

router.get('/', getInstructors);
router.get('/:id', getInstructorById);
router.post('/', createInstructor);
router.put('/:id', updateInstructor);
router.delete('/:id', deleteInstructor);

export default router;
