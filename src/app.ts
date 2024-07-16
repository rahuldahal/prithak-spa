import { env } from './config';
import db_connection from './utils/db';
import createServer from './utils/server';

const PORT = env.PORT;

const app = createServer();

app.listen(PORT, async () => {
  await db_connection();
  console.info(`App is running at http://localhost:${PORT}`);
});
