import { object, string, TypeOf } from 'zod';
import { ISODateTimeRegex } from '../constants';
import { validationErrors } from '../constants/errorMessages';

function isISODateTime(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return ISODateTimeRegex.test(value);
}

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

export const updateTaskSchema = object({
  body: object({
    title: string().optional(),
    description: string().optional(),
    completedAt: string()
      .refine((value) => value === undefined || isISODateTime(value), {
        message: 'completedAt must be a valid ISO date string or undefined',
      })
      .optional(),
  }).refine(
    (value) => {
      const { title, description, completedAt } = value;
      return (
        title !== undefined ||
        description !== undefined ||
        completedAt !== undefined
      );
    },
    {
      message:
        'At least one of title, description, or completedAt must be provided',
    },
  ),
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
