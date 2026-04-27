import { Router } from 'express';
import { getPublicSettings, updateSettings } from '../controllers/settingsController.js';
import { requireAdmin, requireAuth } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { updateSettingsSchema } from '../schemas/settingsSchemas.js';

const router = Router();

router.get('/public', getPublicSettings);
router.patch('/', requireAuth, requireAdmin, validateRequest(updateSettingsSchema), updateSettings);

export default router;
