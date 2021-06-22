import mongo from '@/utils/mongo';
import { createServer } from '@/express';
import logger from '@/utils/logger';
import config from '@/utils/config';
import typeorm from '@/utils/typeorm';

mongo
  .open()
  .then(() => typeorm.open())
  .then(() => createServer())
  .then((server) =>
    server.listen(config.port, () => {
      logger.info(`Server listen on port: ${config.port}`);
    }),
  );
