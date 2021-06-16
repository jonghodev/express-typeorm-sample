import winston from 'winston';
import config from 'src/utils/config';

const prettyJson = winston.format.printf((info) => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.timestamp} ${info.label || '-'} ${info.level}: ${
    info.message
  }`;
});

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
    prettyJson,
  ),
  transports: [new winston.transports.Console({})],
});

class MyStream {
  write(text: string) {
    logger.info(text.replace(/\n$/, ''));
  }
}

export const myStream = new MyStream();

export default logger;
