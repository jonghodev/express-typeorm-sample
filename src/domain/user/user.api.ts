import express from 'express';
import { Joi, validate } from 'express-validation';
import { login, signup } from './user.service';
import { verifyToken } from '@/middleware/authentication';

const router = express.Router();

const signupValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

/**
 * Signup API
 */
router.post('/signup', validate(signupValidation), async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await signup(email, password, name);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

/**
 * Login API
 */
router.post('/login', validate(loginValidation), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);

    res.send({
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get User API
 */
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export default router;
