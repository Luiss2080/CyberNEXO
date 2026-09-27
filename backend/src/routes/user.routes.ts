import { Router } from 'express';
import { addExperience } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Endpoints protegidos
router.post('/xp', requireAuth, addExperience);

export default router;
