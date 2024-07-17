import express from 'express';
import { createTaskSchema } from '../validations/task.validation';
import { validateBody } from '../middlewares/validateBody.middleware';
import {
  createTaskHandler,
  getTasksHandler,
} from '../controller/tasks.controller';

const router = express.Router();

router.get('/', getTasksHandler);
router.post('/', validateBody(createTaskSchema), createTaskHandler);

export default router;
