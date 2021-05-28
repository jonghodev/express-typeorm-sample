import * as dotenv from 'dotenv';
import * as path from 'path';

const { NODE_ENV } = process.env;

/**
 * NODE_ENV 변수에 따라서 환경변수 파일을 읽는다.
 */
export function loadConfig() {
  dotenv.config({
    path: path.resolve(process.cwd(), NODE_ENV === 'dev' ? '.env.dev' : '.env'),
  });
}
