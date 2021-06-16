import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import morganBody from 'morgan-body';
import { router } from './domain';
import { handleError } from './error/errorHandler';
import { myStream } from './utils/logger';

/**
 * Express App 을 반환한다.
 */
export function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use(morgan('combined', { stream: myStream }));
  morganBody(app);

  app.use(router);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(error, res);
  });

  return app;
}
