import express from 'express';

import {
  createExample,
  createIdiom,
  deleteExample,
  deleteIdiom,
  deleteOrigin,
  getAdjacentIdioms,
  getAllIdioms,
  getSingleIdiomWithExamples,
  updateExamples,
  updateIdiom,
  upsertOrigin,
} from '../controllers/idiomsController.js';
import { checkRole, jwtCheck } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getAllIdioms);
router.get('/adjacent', getAdjacentIdioms);
router.get('/:id(\\d+)', getSingleIdiomWithExamples);

// // Protected
router.post('/', jwtCheck, checkRole('Admin'), createIdiom);
router.put('/:id', jwtCheck, checkRole('Admin'), updateIdiom);
router.delete('/:id', jwtCheck, checkRole('Admin'), deleteIdiom);

router.put('/:id/origin', jwtCheck, checkRole('Admin'), upsertOrigin);
router.delete('/:id/origin', jwtCheck, checkRole('Admin'), deleteOrigin);

router.post('/:id/examples', jwtCheck, checkRole('Admin'), createExample);
router.put('/:id/examples', jwtCheck, checkRole('Admin'), updateExamples);
router.delete('/examples/:id', jwtCheck, checkRole('Admin'), deleteExample);

export default router;
