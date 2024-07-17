import { Task } from '../model/task.model';
import { Error as MongooseError } from 'mongoose';
import { CreateTaskDTO, UpdateTaskDTO } from '../DTO/task.dto';

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

async function updateTask(id: string, newData: UpdateTaskDTO) {
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { ...newData, updatedAt: new Date() },
      { new: true },
    );

    return task;
  } catch (error: MongooseError | any) {
    return error;
  }
}

export { createTask, getTasks, updateTask };
