import { Response } from 'express';
import { Errors, ErrorBody } from './errorCode';
import { ValidationError } from 'express-validation';

export class ErrorHandler extends Error {
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
  } else if (err instanceof ErrorHandler) {
    const { message, statusCode } = err;

    res.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    });
  } else {
    console.error(err);
    const { message, statusCode } = Errors.InternalError;

    res.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
