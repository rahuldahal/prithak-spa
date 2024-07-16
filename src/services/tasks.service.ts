import { Task } from '../model/task.model';
import { CreateTaskDTO } from '../DTO/task.dto';
import { Error as MongooseError } from 'mongoose';

async function createTaskService(data: CreateTaskDTO) {
  const task = new Task(data);

  try {
    await task.save();
    return task;
  } catch (error: MongooseError | any) {
    error;
  }
}

export { createTaskService };
