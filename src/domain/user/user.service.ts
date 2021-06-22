import { User } from './user.entity';
import { UserError } from './user.error';
import { CustomError } from '@/error';
import { createJwtToken } from '@/utils/jwt';

export async function signup(email: string, password: string, name: string) {
  const findUser = await User.findByEmail(email);

  if (findUser) {
    throw new CustomError(UserError.AccountAlreadyRegistered);
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
    throw new CustomError(UserError.AccountNotRegistered);
  }

  const isSamePassword = await user.comparePassword(password);
  if (!isSamePassword) {
    throw new CustomError(UserError.IncorrectPassword);
  }

  const payload = {
    sub: user.id,
  };

  const token = createJwtToken(payload);
  return { user, token };
}
