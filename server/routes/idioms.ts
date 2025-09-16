import express from 'express';

import { checkRole, jwtCheck } from '../authMiddleware.js';
import {
  createExample,
  createIdiom,
  deleteExample,
  deleteIdiom,
  getAdjacentIdioms,
  getAllIdioms,
  getSingleIdiomWithExamples,
  updateExamples,
  updateIdiom,
} from '../controllers/idiomsController.js';

const router = express.Router();

// Public
router.get('/', getAllIdioms);
router.get('/adjacent', getAdjacentIdioms);
router.get('/:id(\\d+)', getSingleIdiomWithExamples);

// // Protected
router.post('/', jwtCheck, checkRole('Admin'), createIdiom);
router.put('/:id', jwtCheck, checkRole('Admin'), updateIdiom);
router.delete('/:id', jwtCheck, checkRole('Admin'), deleteIdiom);

router.post('/:id/examples', jwtCheck, checkRole('Admin'), createExample);
router.put('/:id/examples', jwtCheck, checkRole('Admin'), updateExamples);
router.delete('/examples/:id', jwtCheck, checkRole('Admin'), deleteExample);

export default router;
