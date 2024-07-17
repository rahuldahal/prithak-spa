import router from '../routes/tasks.route';
import morganMiddleware from '../middlewares/morgan.middleware';
import express, { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../middlewares/errorHandler.middleware';

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(morganMiddleware);
  app.use('/api/rest/v1', router);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  });

  return app;
}

export default createServer;
