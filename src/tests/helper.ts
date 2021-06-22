import { getTimestamp, hashMessage } from '@/domain/hmac/hmac.util';
import config from '@/utils/config';

export function generateHmacHeaders(method: string, url: string, data: any) {
  const timestamp = getTimestamp().toString();

  const sig = hashMessage(
    config.hmac.secret,
    method,
    url,
    config.hmac.id,
    timestamp,
    data,
  );

  return {
    'content-type': 'application/json',
    'hmac-id': config.hmac.id,
    timestamp,
    sig,
  };
}
