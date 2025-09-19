import express from 'express';

import { getUserSettings, upsertUserSettings } from '../controllers/userSettingsController.js';
import { jwtCheck } from '../middleware/auth.js';

const router = express.Router();

router.get('/me/settings', jwtCheck, getUserSettings);
router.put('/me/settings', jwtCheck, upsertUserSettings);

export default router;
