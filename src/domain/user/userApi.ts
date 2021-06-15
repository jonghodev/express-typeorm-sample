import express from 'express';
import bcrypt from 'bcrypt';
import { User } from './userEntity';
import { Joi, validate } from 'express-validation';
import { ErrorHandler } from '../../error';
import { UserError } from './userError';
import { createToken } from '../../utils/jwt';
import { authenticateToken } from '../../middleware/authentication';

const router = express.Router();

const signupValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

router.post('/signup', validate(signupValidation), async (req, res, next) => {
  try {
    const { username, password: rawPassword, name } = req.body;

    const findUser = await User.findByUsername(username);

    if (findUser) {
      throw new ErrorHandler(UserError.AccountAlreadyRegistered);
    }

    const password = await bcrypt.hash(rawPassword, 5);

    const user = await User.create({
      username,
      password,
      name,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

const loginValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

router.post('/login', validate(loginValidation), async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);

    if (!user) {
      throw new ErrorHandler(UserError.AccountNotRegistered);
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      throw new ErrorHandler(UserError.IncorrectPassword);
    }

    const payload = {
      sub: user.id,
    };

    const token = createToken(payload);

    res.send({
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});

export default router;
