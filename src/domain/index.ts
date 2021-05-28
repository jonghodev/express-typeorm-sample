import express, { Request, Response } from 'express';
import userApi from './user/userApi';

export const router = express.Router();

router.use('/user', userApi);

router.get('/health', (req: Request, res: Response) =>
  res.status(200).send('Server is healthy!'),
);
