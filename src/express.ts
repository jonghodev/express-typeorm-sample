import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morganBody from 'morgan-body';
import { router } from './domain';
import { handleError } from './error/custom.error';
import { morganBodyOptions } from './utils/logger';

/**
 * Express App 을 반환한다.
 */
export function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  morganBody(app, morganBodyOptions);

  app.use(router);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(error, res);
  });

  return app;
}
