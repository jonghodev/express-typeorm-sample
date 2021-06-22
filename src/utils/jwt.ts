import jwt from 'jsonwebtoken';
import config from '@/utils/config';
import { CommonError, CustomError } from '@/error';

export interface JwtPayload {
  sub: string; // user id
}

export function createJwtToken(payload: JwtPayload) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '7d',
  });
}

export function verifyJwtToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, payload: any) => {
      if (err) {
        reject(new CustomError(CommonError.InvalidToken));
      }

      resolve(payload);
    });
  });
}
