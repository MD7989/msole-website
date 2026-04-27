import { Router } from 'express';
import { login, logout, me, refresh, register } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginSchema, refreshSchema, registerSchema } from '../schemas/authSchemas.js';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh', validateRequest(refreshSchema), refresh);
router.get('/me', requireAuth, me);
router.post('/logout', requireAuth, logout);

export default router;
