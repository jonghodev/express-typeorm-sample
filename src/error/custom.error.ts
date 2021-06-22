import { Response } from 'express';
import { CommonError, ErrorBody } from './common.error';
import { ValidationError } from 'express-validation';
import logger from '@/utils/logger';

export class CustomError extends Error {
  message: string;
  statusCode: number;

  constructor(error: ErrorBody) {
    super();
    this.message = error.message;
    this.statusCode = error.statusCode;
  }
}

export function handleError(err: Error, res: Response) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  } else if (err instanceof CustomError) {
    const { message, statusCode } = err;

    res.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    });
  } else {
    logger.error(err);
    const { message, statusCode } = CommonError.InternalError;

    res.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      error: err.message,
    });
  }
}
