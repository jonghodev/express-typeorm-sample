import db from '@/utils/db';
import { createServer } from '@/express';
import logger from '@/utils/logger';
import config from '@/utils/config';

db.open()
  .then(() => createServer())
  .then((server) =>
    server.listen(config.port, () => {
      logger.info(`Server listen on port: ${config.port}`);
    }),
  );
