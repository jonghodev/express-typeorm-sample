import db from 'src/utils/db';
import { createServer } from 'src/express';
import logger from 'src/utils/logger';
import config from 'src/utils/config';

export async function initializeServer() {
  await db.open();
  const server = createServer();
  server.listen(config.port, () => {
    logger.info(`Server listen on port: ${config.port}`);
  });
}

initializeServer();
