import { OBJECT_ID_REGEX, ORDERS } from '../constants';
import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { createTask, getTasks, updateTask } from '../services';
import {
  CreateTaskInput,
  UpdateTaskInput,
} from '../validations/task.validation';

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
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.query) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    const { page = 1, limit = 10, sort = ORDERS.ASC, search } = req.query;

    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: String(sort),
      search: search ? String(search) : undefined,
    };

    const tasks = await getTasks(options);

    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    return next(error);
  }
}

export async function updateTaskHandler(
  req: Request<{ id: string }, {}, UpdateTaskInput['body']>,
  res: Response,
  next: NextFunction,
) {
  const { params } = req;
  if (params === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }

  const { id } = params;
  if (!id.match(OBJECT_ID_REGEX)) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }

  const { title, description, completedAt } = req.body;

  try {
    const task = await updateTask(id, { title, description, completedAt });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Task not found' });
    }

    return res.status(StatusCodes.OK).json(task);
  } catch (error: MongooseError | any) {
    return next(error);
  }
}
