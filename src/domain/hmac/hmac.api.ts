import express from 'express';
import { Joi, validate } from 'express-validation';
import { HmacRole } from '@/domain/hmac/hmac.entity';
import { createHmac } from '@/domain/hmac/hmac.service';
import { verifyHmacSuper } from '@/middleware/authentication';

const router = express.Router();

const signupValidation = {
  body: Joi.object({
    role: Joi.string().valid(...Object.values(HmacRole)),
  }),
};

/**
 * Signup API
 */
router.post(
  '/',
  verifyHmacSuper,
  validate(signupValidation),
  async (req, res, next) => {
    try {
      const { role } = req.body;
      const { id, secret } = await createHmac(role);

      res.status(201).json({ id, secret });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
