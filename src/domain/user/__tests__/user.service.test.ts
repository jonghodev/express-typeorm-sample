import faker from 'faker';
import mongo from '@/utils/mongo';
import { User } from '@/domain/user/user.entity';
import { login, signup } from '@/domain/user/user.service';
import { createDummyUser } from '@/tests/userDummy';

beforeAll(async () => {
  await mongo.open();
});

afterAll(async () => {
  await mongo.close();
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
  it('should return JWT token, user to a valid login/password', async () => {
    const dummy = await createDummyUser();
    const res = await login(dummy.email, dummy.password);

    expect(res.user.id).toBe(dummy.id);
    expect(res.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
    );
  });

  it('should not login with wrong password', async () => {
    const dummy = await createDummyUser();
    User.findByEmail = jest.fn().mockResolvedValue(dummy);
    await expect(login(dummy.email, 'wrong pw')).rejects.toThrowError();
  });
});
