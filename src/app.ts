import { env } from './config';
import logger from './utils/logger';
import db_connection from './utils/db';
import createServer from './utils/server';

const PORT = env.PORT;

const app = createServer();

app.listen(PORT, async () => {
  await db_connection();
  logger.info(`App is running at http://localhost:${PORT}`);
});
