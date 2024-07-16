import express from 'express';
import { createTask } from '../controller/tasks.controller';

const router = express.Router();

router.post('/', createTask);

export default router;
