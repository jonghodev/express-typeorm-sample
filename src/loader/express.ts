import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { router } from '../domain';
import { handleError } from '../error/errorHandler';

/**
 * Express App 서버를 실행한다.
 */
export function runExpress() {
  const { PORT } = process.env;
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use(morgan('combined'));

  app.use(router);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(error, res);
  });

  app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
  });
}
