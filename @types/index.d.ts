import { User } from '@/domain/user/user.entity'; // <- User class

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
