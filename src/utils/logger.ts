import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import config from '@/utils/config';

/**
 * Error format function
 */
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign(
      {
        message: info.message,
        stack: info.stack,
      },
      info,
    );
  }

  return info;
});

/**
 * Winston printf function
 */
const prettyJson = winston.format.printf((info) => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.timestamp} ${info.label || '-'} ${info.level}: ${
    info.message
  }`;
});

/**
 * log 저장 디렉토리 이름
 */
const logDir = 'logs';

/**
 * Winston Logger 생성
 */
const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
    enumerateErrorFormat(),
    prettyJson,
  ),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

export default logger;

const loggerStream: any = {
  write: (text: string) => {
    logger.info(text);
  },
};

export const morganBodyOptions = {
  stream: loggerStream,
  noColors: true,
};
