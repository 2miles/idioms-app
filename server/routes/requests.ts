import express from 'express';

import {
  createRequest,
  deleteRequest,
  getAllRequests,
  markRequestAsAdded,
} from '../controllers/requestsController.js';
import { checkRole, jwtCheck } from '../middleware/auth.js';
import { requestLimiter } from '../middleware/requestLimiter.js';

const router = express.Router();

router.get('/', jwtCheck, checkRole('Admin'), getAllRequests);
router.post('/', requestLimiter, jwtCheck, checkRole(['Admin', 'User']), createRequest);
router.patch('/:id/mark-added', jwtCheck, checkRole('Admin'), markRequestAsAdded);
router.delete('/:id', jwtCheck, checkRole('Admin'), deleteRequest);

export default router;
