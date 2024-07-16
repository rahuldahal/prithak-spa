import { AnyZodObject } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export function validateBody(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
      });
      next();
    } catch (e: any) {
      return res.status(StatusCodes.BAD_REQUEST).send(e.errors);
    }
  };
}
