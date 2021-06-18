import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from './logger';
import config from '@/utils/config';

class MongoConnection {
  private static _instance: MongoConnection;

  private _mongoServer?: MongoMemoryServer;

  static getInstance(): MongoConnection {
    if (!MongoConnection._instance) {
      MongoConnection._instance = new MongoConnection();
    }
    return MongoConnection._instance;
  }

  public async open() {
    const options = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };

    if (config.mongo.url === 'inmemory') {
      this._mongoServer = new MongoMemoryServer();
      const inmemoryMongoUrl = await this._mongoServer.getUri();
      logger.debug('Mongo: connected inmemory');

      mongoose.connect(inmemoryMongoUrl, options).catch((err) => {
        logger.error(err);
      });
    } else {
      mongoose.connect(config.mongo.url, options).catch((err) => {
        logger.error(err);
      });
    }

    mongoose.connection.on('connected', () => {
      logger.info('Mongo: connected');
    });

    mongoose.connection.on('disconnected', () => {
      logger.info('Mongo: disconnected');
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`Mongo:  ${String(err)}`);

      if (err.name === 'MongoNetworkError') {
        setTimeout(function () {
          mongoose.connect(config.mongo.url, options).catch(() => {});
        }, 5000);
      }
    });
  }

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      if (config.mongo.url === 'inmemory') {
        await this._mongoServer!.stop();
      }
    } catch (err) {
      logger.error(`db.open: ${err}`);
      throw err;
    }
  }
}

export default MongoConnection.getInstance();
