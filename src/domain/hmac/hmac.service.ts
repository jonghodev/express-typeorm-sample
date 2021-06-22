import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Hmac, { HmacRole } from '@/domain/hmac/hmac.entity';
import { randomBytes } from 'crypto';

export async function createHmac(role: HmacRole) {
  const repo = getRepository(Hmac);

  const hmac = await repo.save({
    id: uuidv4(),
    secret: randomBytes(32).toString('hex'),
    role: role,
  });

  return {
    id: hmac.id,
    secret: hmac.secret,
  };
}
