import request from 'supertest';
import { Express } from 'express';
import typeorm from '@/utils/typeorm';
import { createServer } from '@/express';
import { HmacRole } from '@/domain/hmac/hmac.entity';
import { generateHmacHeaders } from '@/tests/helper';

let server: Express;
beforeAll(async () => {
  await typeorm.open();
  server = createServer();
});

afterAll(async () => {
  await typeorm.close();
});

describe('POST /hmac', () => {
  const url = '/hmac';
  const method = 'POST';

  it('should return 201 & valid response', async () => {
    const data = {
      role: HmacRole.Admin,
    };
    const headers = generateHmacHeaders(method, url, data);

    await request(server)
      .post(url)
      .set(headers)
      .send(data)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('secret');
      });
  });
});
