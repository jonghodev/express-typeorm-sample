import express from 'express';
import { User } from './userEntity';
import { Joi, validate } from 'express-validation';

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
    const { username, password, name } = req.body;

    const user = await User.create({
      username,
      password,
      name,
    });

    res.send(user);
  } catch (err) {
    next(err);
  }
});

export default router;
