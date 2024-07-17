import { Task } from '../model/task.model';
import { Error as MongooseError } from 'mongoose';
import { CreateTaskDTO, UpdateTaskDTO } from '../DTO/task.dto';
import { CASE_INSENSITIVE, DATA_SORT_FIELD, ORDERS } from '../constants';

interface GetTasksOptions {
  page: number;
  limit: number;
  sort: string;
  search?: string;
}

interface GetTasksOptions {
  page: number;
  limit: number;
  sort: string;
  search?: string;
}

async function createTask(data: CreateTaskDTO) {
  const task = new Task(data);

  try {
    await task.save();
    return task;
  } catch (error: MongooseError | any) {
    return error;
  }
}

async function getTasks(options: GetTasksOptions) {
  try {
    let query = Task.find();
    if (options.search) {
      const regex = new RegExp(options.search, CASE_INSENSITIVE);
      query = query.find({ title: regex });
    }

    const skip = (options.page - 1) * options.limit;
    query = query.skip(skip).limit(options.limit);

    const sortOption =
      options.sort === ORDERS.ASC ? DATA_SORT_FIELD.ASC : DATA_SORT_FIELD.DESC;
    query = query.sort(sortOption);

    const tasks = await query.exec();

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
