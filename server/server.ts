import express, { Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'; // HTTP request logger
import cors from 'cors';
import idiomsRouter from './routes/idioms.js';
import userSettingsRouter from './routes/userSettings.js';
import requestsRoutes from './routes/requests.js';

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(','),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev')); // Logging middleware

const port = parseInt(process.env.PORT || '3001', 10);

// Health check route for e2e testing
if (process.env.NODE_ENV === 'test') {
  app.get('/', (_, res: Response) => {
    res.status(200).send('OK');
  });
}

app.use('/api/v1/idioms', idiomsRouter);
app.use('/api/v1', userSettingsRouter);
app.use('/api/v1/requests', requestsRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
