import express from 'express';
import { createTaskSchema } from '../validations/task.validation';
import { createTaskHandler } from '../controller/tasks.controller';
import { validateBody } from '../middlewares/validateBody.middleware';

const router = express.Router();

router.post('/', validateBody(createTaskSchema), createTaskHandler);

export default router;
