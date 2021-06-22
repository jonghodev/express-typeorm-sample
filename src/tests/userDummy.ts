import faker from 'faker';
import { User } from '@/domain/user/user.entity';

interface DummyUser {
  id: string;
  email: string;
  password: string;
  name: string;
}

export function dummyUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.firstName(),
  };
}

export async function createDummyUser(): Promise<DummyUser> {
  const user = dummyUser();
  const dbUser = new User(user);
  await dbUser.save();
  return { ...user, id: dbUser._id.toString() };
}
