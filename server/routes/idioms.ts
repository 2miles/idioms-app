import express from 'express';
import {
  getAllIdioms,
  getSingleIdiomWithExamples,
  createIdiom,
  updateIdiom,
  deleteIdiom,
  createExample,
  updateExamples,
  deleteExample,
} from '../controllers/idiomsController.js';

import { jwtCheck, checkRole } from '../authMiddleware.js';

const idiomsRouter = express.Router();

// Public
idiomsRouter.get('/', getAllIdioms);
idiomsRouter.get('/:id', getSingleIdiomWithExamples);

// // Protected
idiomsRouter.post('/', jwtCheck, checkRole('Admin'), createIdiom);
idiomsRouter.put('/:id', jwtCheck, checkRole('Admin'), updateIdiom);
idiomsRouter.delete('/:id', jwtCheck, checkRole('Admin'), deleteIdiom);

idiomsRouter.post('/:id/examples', jwtCheck, checkRole('Admin'), createExample);
idiomsRouter.put('/:id/examples', jwtCheck, checkRole('Admin'), updateExamples);
idiomsRouter.delete('/examples/:id', jwtCheck, checkRole('Admin'), deleteExample);

export default idiomsRouter;
