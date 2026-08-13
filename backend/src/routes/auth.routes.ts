import { Router } from 'express';
import { verifyGoogleAuth, completeProfile, getMe, logout } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Public route to exchange Google ID Token for our JWT
router.post('/google', verifyGoogleAuth);

// Protected routes (require valid JWT cookie)
router.get('/me', requireAuth, getMe);
router.post('/complete-profile', requireAuth, completeProfile);
router.post('/logout', logout);

export default router;
