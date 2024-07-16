import { object, string, TypeOf } from 'zod';
import { validationErrors } from '../constants/errorMessages';

export const createTaskSchema = object({
  body: object({
    title: string({
      required_error: validationErrors.fieldIsRequired('title'),
    }),
    description: string({
      required_error: validationErrors.fieldIsRequired('description'),
    }),
    username: string({
      required_error: validationErrors.fieldIsRequired('username'),
    }),
  }),
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
