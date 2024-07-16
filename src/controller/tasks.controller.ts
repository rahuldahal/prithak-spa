import { Task } from '../model/task.model';
import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

export async function createTask(req: Request, res: Response) {
  const { title, description, username } = req.body;

  if (!title || !description || !username) {
    return res.sendStatus(400);
  }

  const task = new Task({
    title,
    description,
    username,
  });

  try {
    await task.save();
    return res.status(201).json(task);
  } catch (error: MongooseError | any) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
}
