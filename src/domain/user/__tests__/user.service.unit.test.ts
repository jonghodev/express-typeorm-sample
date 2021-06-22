import { User } from '@/domain/user/user.entity';
import { login } from '@/domain/user/user.service';
import { dummyUser } from '@/tests/userDummy';

describe('login', () => {
  it('should return JWT token, user to a valid login/password', async () => {
    // given
    const dummy = await dummyUser();
    User.findByEmail = jest.fn().mockResolvedValue({
      ...dummy,
      comparePassword: jest.fn().mockResolvedValue(true),
    });

    // when
    const res = await login(dummy.email, dummy.password);

    // then
    expect(res.user.email).toBe(dummy.email);
    expect(res.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
    );
  });

  it('should not login with wrong password', async () => {
    const dummy = await dummyUser();
    User.findByEmail = jest.fn().mockResolvedValue(dummy);
    await expect(login(dummy.email, 'wrong pw')).rejects.toThrowError();
  });
});
