import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';
import { createTask, getTasks } from '../services';
import { NextFunction, Request, Response } from 'express';
import { CreateTaskInput } from '../validations/task.validation';

export async function createTaskHandler(
  req: Request<{}, {}, CreateTaskInput['body']>,
  res: Response,
  next: NextFunction,
) {
  const { title, description, username } = req.body;

  try {
    const createdTask = await createTask({ title, description, username });
    return res.status(StatusCodes.CREATED).json(createdTask);
  } catch (error: MongooseError | any) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }

    return next(error);
  }
}

export async function getTasksHandler(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tasks = await getTasks();
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error: MongooseError | any) {
    return next(error);
  }
}
