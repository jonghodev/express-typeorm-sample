import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ErrorHandler } from '../error';
import { MiddlewareError } from './middlewareError';
import { User } from '../domain/user/userEntity';

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) throw new ErrorHandler(MiddlewareError.InvalidToken);

  verifyToken(token, async (err, payload: any) => {
    if (err) throw new ErrorHandler(MiddlewareError.InvalidToken);

    const user = await User.findById(payload.sub);
    req.user = user;
    next();
  });
}
