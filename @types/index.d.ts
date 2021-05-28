import { User } from '../src/domain/user/userEntity'; // <- User class

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
