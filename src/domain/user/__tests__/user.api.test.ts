import faker from 'faker';
import request from 'supertest';
import { Express } from 'express';
import mongo from '@/utils/mongo';
import { createServer } from '@/express';
import { createDummyUser } from '@/tests/userDummy';
import { login } from '@/domain/user/user.service';

let server: Express;
beforeAll(async () => {
  await mongo.open();
  server = createServer();
});

afterAll(async () => {
  await mongo.close();
});

describe('POST /user/signup', () => {
  it('should return 201 & valid response for valid user', async () => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.firstName(),
    };

    await request(server)
      .post(`/user/signup`)
      .send(data)
      .expect(201)
      .then((res) => {
        expect(res.body.email).toBe(data.email);
        expect(res.body.name).toBe(data.name);
        expect(res.body.isAdmin).toBe(false);
      });
  });
});

describe('POST /user/login', () => {
  it('should return 200 & valid response for valid login request', async () => {
    const dummy = await createDummyUser();
    const data = {
      email: dummy.email,
      password: dummy.password,
    };

    await request(server)
      .post(`/user/login`)
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body.user._id).toBe(dummy.id);
        expect(res.body.token).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        );
      });
  });
});

describe('GET /user', () => {
  it('should return user', async () => {
    const dummy = await createDummyUser();
    const res = await login(dummy.email, dummy.password);

    await request(server)
      .get(`/user`)
      .set('Authorization', 'Bearer ' + res.token)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(dummy.id);
      });
  });
});
