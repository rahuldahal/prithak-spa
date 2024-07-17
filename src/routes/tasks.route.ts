import express from 'express';
import { validateBody } from '../middlewares/validateBody.middleware';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validations/task.validation';
import {
  createTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from '../controller/tasks.controller';

const router = express.Router();

router.get('/', getTasksHandler);
router.put('/:id', validateBody(updateTaskSchema), updateTaskHandler); // I would rather user the industry standard 'PATCH' method for updating a part of the data
router.post('/', validateBody(createTaskSchema), createTaskHandler);

export default router;
