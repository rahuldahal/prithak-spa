import logger from '../utils/logger';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(`Error processing ${req.method} ${req.url}`);
  logger.error(`Params:`, req.params);
  logger.error(`Query:`, req.query);
  logger.error(`Headers:`, req.headers);
  logger.error(err.stack);

  if (err instanceof createError.HttpError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({ error: message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
};
