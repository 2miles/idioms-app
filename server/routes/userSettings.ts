import express from 'express';
import { jwtCheck } from '../authMiddleware.js';
import { getUserSettings, upsertUserSettings } from '../controllers/userSettingsController.js';

const router = express.Router();

router.get('/me/settings', jwtCheck, getUserSettings);
router.put('/me/settings', jwtCheck, upsertUserSettings);

export default router;
