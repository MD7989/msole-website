import { Router } from 'express';
import { createContactMessage, listContactMessages } from '../controllers/contactController.js';
import { requireAdmin, requireAuth } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createContactMessageSchema } from '../schemas/contactSchemas.js';

const router = Router();

router.post('/', validateRequest(createContactMessageSchema), createContactMessage);
router.get('/', requireAuth, requireAdmin, listContactMessages);

export default router;
