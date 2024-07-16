import express from 'express';
import router from '../routes/tasks.route';

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/api/rest/v1', router);

  return app;
}

export default createServer;
