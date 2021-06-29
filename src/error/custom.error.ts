import { Response } from 'express';
import { ValidationError, Joi } from 'express-validation';
import { CommonError, ErrorBody } from './common.error';
import config from '@/utils/config';
import { NodeEnv } from '@/utils/constants';

export class CustomError extends Error {
  message: string;
  statusCode: number;
  details?: any;

  constructor(error: ErrorBody) {
    super();
    this.message = error.message;
    this.statusCode = error.statusCode;
    this.details = error?.details;
  }
}

interface ErrorFormat {
  statusCode: number;
  message: string;
  timestamp: string;
  error?: any;
}

export function handleError(err: Error | ValidationError, res: Response) {
  /**
   * For stack tracing
   */
  if (config.nodeEnv === NodeEnv.Dev || config.nodeEnv === NodeEnv.Test) {
    console.error(err);
  }

  /**
   * 1. Validation Error
   */
  if (err instanceof ValidationError || err instanceof Joi.ValidationError) {
    const error: ErrorFormat = {
      statusCode: 400,
      message: 'Validation Failed',
      timestamp: new Date().toISOString(),
      error: err.details,
    };
    return res.status(error.statusCode).json(error);
  }

  /**
   * 2. Custom Error
   */
  if (err instanceof CustomError) {
    const { message, statusCode, details } = err;
    const error: ErrorFormat = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      error: details,
    };

    return res.status(error.statusCode).json(error);
  }

  /**
   * 3. Unexpected Error
   */
  const { message, statusCode } = CommonError.InternalError;
  const error: ErrorFormat = {
    statusCode,
    message,
    timestamp: new Date().toISOString(),
    error: err.message,
  };

  return res.status(error.statusCode).json(error);
}
