import {
  Connection,
  ConnectionOptions,
  createConnection,
  getRepository,
} from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'reflect-metadata';
import config from '@/utils/config';
import logger from '@/utils/logger';
import { NodeEnv } from '@/utils/constants';
import Hmac, { HmacRole } from '@/domain/hmac/hmac.entity';

class TypeormConnection {
  private static _instance: TypeormConnection;
  private _connection?: Connection;

  static getInstance(): TypeormConnection {
    if (!TypeormConnection._instance) {
      TypeormConnection._instance = new TypeormConnection();
    }
    return TypeormConnection._instance;
  }

  public async open() {
    if (config.typeorm.url === 'inmemory') {
      const options: ConnectionOptions = {
        type: 'sqlite',
        database: `sqlite/db.sqlite`,
        entities: ['src/domain/**/*.entity.ts'],
        logging: false,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
      };

      this._connection = await createConnection(options);
    } else {
      const options: ConnectionOptions = {
        type: 'mysql',
        host: config.typeorm.url,
        database: config.typeorm.database,
        port: config.typeorm.port,
        username: config.typeorm.username,
        password: config.typeorm.password,
        entities: ['src/domain/**/*.entity.ts'],
        logging: true,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
      };

      this._connection = await createConnection(options);
    }

    await this.initHmacIfTestEnv();

    logger.info('Typeorm: connected');
  }

  private async initHmacIfTestEnv() {
    if (config.nodeEnv === NodeEnv.Test) {
      const hmac = getRepository(Hmac);
      await hmac.save({
        id: config.hmac.id,
        secret: config.hmac.secret,
        role: HmacRole.Super,
      });
    }
  }

  public async close() {
    await this._connection?.close();
    logger.info('Typeorm: closed');
  }
}

export default TypeormConnection.getInstance();
