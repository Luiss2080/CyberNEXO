import { Router } from 'express';
import { addExperience, getLeaderboard } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Endpoints protegidos
router.post('/xp', requireAuth, addExperience);
router.get('/leaderboard', requireAuth, getLeaderboard);

export default router;
