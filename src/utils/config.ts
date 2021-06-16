import * as dotenv from 'dotenv';
import * as path from 'path';
import dotenvParseVariables from 'dotenv-parse-variables';

const { NODE_ENV } = process.env;

/**
 * NODE_ENV 변수에 따라서 환경변수 파일을 읽는다.
 */
const configPath = process.cwd() + '/config';
let envFileName = '';

if (NODE_ENV === 'dev') {
  envFileName = '.env.dev';
} else if (NODE_ENV === 'test') {
  envFileName = '.env.test';
} else if (NODE_ENV === 'stg') {
  envFileName = '.env.stg';
} else if (NODE_ENV === 'prod') {
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
