import { Task } from '../model/task.model';
import { CreateTaskDTO } from '../DTO/task.dto';
import { Error as MongooseError } from 'mongoose';

async function createTask(data: CreateTaskDTO) {
  const task = new Task(data);

  try {
    await task.save();
    return task;
  } catch (error: MongooseError | any) {
    return error;
  }
}

async function getTasks() {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error: MongooseError | any) {
    return error;
  }
}

export { createTask, getTasks };
