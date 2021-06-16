import { User } from './userEntity';
import { ErrorHandler } from '../../error';
import { UserError } from './userError';
import { createToken } from '../../utils/jwt';

export async function signup(email: string, password: string, name: string) {
  const findUser = await User.findByEmail(email);

  if (findUser) {
    throw new ErrorHandler(UserError.AccountAlreadyRegistered);
  }

  const user = await User.create({
    email,
    password,
    name,
  });
  return user;
}

export async function login(email: string, password: string) {
  const user = await User.findByEmail(email);

  if (!user) {
    throw new ErrorHandler(UserError.AccountNotRegistered);
  }

  const isSamePassword = await user.comparePassword(password);
  if (!isSamePassword) {
    throw new ErrorHandler(UserError.IncorrectPassword);
  }

  const payload = {
    sub: user.id,
  };

  const token = createToken(payload);
  return { user, token };
}
