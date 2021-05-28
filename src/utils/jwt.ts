import jwt, { VerifyCallback } from 'jsonwebtoken';

export function createToken(payload: Record<string, any>) {
  return jwt.sign(payload, String(process.env.JWT_SECRET), {
    expiresIn: '7d',
  });
}

export function verifyToken(token: string, fn: VerifyCallback) {
  jwt.verify(token, String(process.env.JWT_SECRET), fn);
}
