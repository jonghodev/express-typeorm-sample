import db from 'src/utils/db';
import { createServer } from 'src/express';
import logger from 'src/utils/logger';
import config from 'src/utils/config';

db.open()
  .then(() => createServer())
  .then((server) =>
    server.listen(config.port, () => {
      logger.info(`Server listen on port: ${config.port}`);
    }),
  );
