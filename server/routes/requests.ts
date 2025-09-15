import express from 'express';
import {
  createRequest,
  getAllRequests,
  markRequestAsAdded,
  deleteRequest,
} from '../controllers/requestsController.js';
import { checkRole, jwtCheck } from '../authMiddleware.js';

const router = express.Router();

router.get('/', jwtCheck, checkRole('Admin'), getAllRequests);
router.post('/', jwtCheck, checkRole(['Admin', 'User']), createRequest);
router.patch('/:id/mark-added', jwtCheck, checkRole('Admin'), markRequestAsAdded);
router.delete('/:id', jwtCheck, checkRole('Admin'), deleteRequest);

export default router;
