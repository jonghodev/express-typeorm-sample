import faker from 'faker';
import db from '@/utils/db';
import { User } from '@/domain/user/userEntity';
import { login, signup } from '@/domain/user/userService';
import { createDummyUser } from '@/tests/userDummy';

beforeAll(async () => {
  await db.open();
});

afterAll(async () => {
  await db.close();
});

describe('signup', () => {
  it('should create user', async () => {
    // given
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.name.firstName();

    // When
    const user = await signup(email, password, name);

    // then
    const fetched = await User.findById(user._id);

    expect(fetched).not.toBeNull();
    expect(fetched!.email).toBe(email);
    expect(fetched!.name).toBe(name);
    expect(fetched!.password).not.toBe(password);
  });
});

describe('login', () => {
  it('should return JWT token, userId, expireAt to a valid login/password', async () => {
    const dummy = await createDummyUser();
    const res = await login(dummy.email, dummy.password);

    expect(res.user.id).toBe(dummy.id);
    expect(res.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
    );
  });
});
