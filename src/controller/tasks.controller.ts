import { createTask } from '../services';
import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { CreateTaskInput } from '../validations/task.validation';

export async function createTaskHandler(
  req: Request<{}, {}, CreateTaskInput['body']>,
  res: Response,
  next: NextFunction,
) {
  const { title, description, username } = req.body;

  try {
    const createdTodo = await createTask({ title, description, username });
    return res.status(StatusCodes.CREATED).json(createdTodo);
  } catch (error: MongooseError | any) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }

    return next(error);
  }
}
