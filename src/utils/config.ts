import * as dotenv from 'dotenv';
import * as path from 'path';
import dotenvParseVariables from 'dotenv-parse-variables';
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
});
const parsedEnv = dotenvParseVariables(env.parsed!);

interface Config {
  port: number;
  logLevel: string;
  mongo: {
    url: string;
  };
  jwtSecret: string;
}

const config: Config = {
  port: parsedEnv.PORT as number,
  logLevel: parsedEnv.LOG_LEVEL as string,
  mongo: {
    url: parsedEnv.MONGO_URL as string,
  },
  jwtSecret: parsedEnv.JWT_SECRET as string,
};

export default config;
