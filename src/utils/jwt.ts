import jwt, { VerifyCallback } from 'jsonwebtoken';
import config from '@/utils/config';

export function createToken(payload: Record<string, any>) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '7d',
  });
}

export function verifyToken(token: string, fn: VerifyCallback) {
  jwt.verify(token, config.jwtSecret, fn);
}
