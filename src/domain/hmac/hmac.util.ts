import { createHmac } from 'crypto';
import { CommonError, CustomError } from '@/error';

export function verifyMessage(
  sig: string,
  secret: string,
  method: string,
  url: string,
  hmacId: string,
  timestamp: string,
  body: any = '',
) {
  verifyTimestamp(timestamp);

  const hash = hashMessage(secret, method, url, hmacId, timestamp, body);
  if (sig !== hash) {
    throw new CustomError(CommonError.InvalidSignature);
  }
}

function verifyTimestamp(timestamp: string) {
  const now = getTimestamp();
  if (Math.abs(now - parseInt(timestamp, 10)) > 60 * 3) {
    throw new CustomError(CommonError.AuthenticationTimeout);
  }
}

export function getTimestamp() {
  const now = Math.floor(Date.now() / 1000);
  return now;
}

export function hashMessage(
  secret: string,
  method: string,
  url: string,
  hmacId: string,
  timestamp: string,
  body: any = '',
) {
  const message = createMessage(method, url, hmacId, timestamp, body);
  const hash = createHmac('sha256', secret)
    .update(message)
    .digest()
    .toString('hex');

  return hash;
}

function createMessage(
  method: string,
  url: string,
  hmacId: string,
  timestamp: string,
  body: any = '',
) {
  const hmacMessage = method
    .concat(url)
    .concat(hmacId)
    .concat(timestamp.toString())
    .concat(body);

  return hmacMessage;
}
