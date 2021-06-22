import { NextFunction, Request, Response } from 'express';
import { Joi } from 'express-validation';
import { verifyMessage } from '@/domain/hmac/hmac.util';
import Hmac, { HmacRole } from '@/domain/hmac/hmac.entity';
import { User } from '@/domain/user/user.entity';
import { verifyJwtToken } from '@/utils/jwt';
import { CommonError, CustomError } from '@/error';

const tokenValidator = Joi.object({
  authorization: Joi.string().required(),
}).unknown(true);

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { value, error } = tokenValidator.validate(req.headers);
    if (error) throw new CustomError(CommonError.InvalidHeader);

    const authHeader = value.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    const payload = await verifyJwtToken(token);
    const user = await User.findById(payload.sub);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

const hmacValidator = Joi.object({
  'hmac-id': Joi.string().required(),
  timestamp: Joi.string().required(),
  sig: Joi.string().required(),
}).unknown(true);

export async function verifyHmacAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const hmac = await verifyHmac(req);
    next();
  } catch (error) {
    next(error);
  }
}

export async function verifyHmacSuper(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const hmac = await verifyHmac(req);
    if (hmac.role !== HmacRole.Super) {
      throw new CustomError(CommonError.InvalidRole);
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function verifyHmac(req: Request) {
  const { value, error } = hmacValidator.validate(req.headers);
  if (error) throw new CustomError(CommonError.InvalidHeader);

  const { 'hmac-id': hmacId, sig, timestamp } = value;
  const { method, baseUrl: url, body = '' } = req;

  const hmac = await Hmac.getById(hmacId);

  verifyMessage(sig, hmac.secret, method, url, hmacId, timestamp, body);
  return hmac;
}
