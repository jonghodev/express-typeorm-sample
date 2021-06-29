import * as dotenv from 'dotenv';
import * as path from 'path';
import { NodeEnv } from '@/utils/constants';

const { NODE_ENV } = process.env;

/**
 * NODE_ENV 변수에 따라서 환경변수 파일을 읽는다.
 */
const configPath = process.cwd() + '/config';
let envFileName = '';

if (NODE_ENV === NodeEnv.Dev) {
  envFileName = '.env.dev';
} else if (NODE_ENV === NodeEnv.Test) {
  envFileName = '.env.test';
} else if (NODE_ENV === NodeEnv.Stg) {
  envFileName = '.env.stg';
} else if (NODE_ENV === NodeEnv.Prod) {
  envFileName = '.env.prod';
}

let env = dotenv.config({
  path: path.resolve(configPath, envFileName),
}).parsed!;

interface Config {
  readonly nodeEnv: NodeEnv;
  readonly hmac: {
    readonly id: string;
    readonly secret: string;
  };
  readonly port: number;
  readonly logLevel: string;
  readonly mongo: {
    readonly url: string;
  };
  readonly typeorm: {
    readonly url: string;
    readonly database: string;
    readonly port: number;
    readonly username: string;
    readonly password: string;
  };
  readonly jwtSecret: string;
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  hmac: {
    id: env.HMAC_ID,
    secret: env.HMAC_SECRET,
  },
  port: Number(env.PORT),
  logLevel: env.LOG_LEVEL,
  mongo: {
    url: env.MONGO_URL,
  },
  typeorm: {
    url: env.TYPEORM_URL,
    database: env.TYPEORM_DATABASE,
    port: Number(env.TYPEORM_PORT),
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
  },
  jwtSecret: env.JWT_SECRET,
};

export default config;
