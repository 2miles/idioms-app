import express from 'express';
import { jwtCheck } from '../authMiddleware.js';
import { getUserSettings, upsertUserSettings } from '../controllers/userSettingsController.js';

const userSettingsRouter = express.Router();

// GET /api/v1/me/settings
userSettingsRouter.get('/me/settings', jwtCheck, getUserSettings);

// PUT /api/v1/me/settings
userSettingsRouter.put('/me/settings', jwtCheck, upsertUserSettings);

export default userSettingsRouter;
