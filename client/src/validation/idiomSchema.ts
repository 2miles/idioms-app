import { z } from 'zod';

export const idiomSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .max(100, 'Title must be 100 characters or less')
    .trim(),
  titleGeneral: z
    .string()
    .max(100, 'General Title must be 100 characters or less')
    .transform((val) => (val.trim() === '' ? null : val))
    .nullable(),
  definition: z
    .string()
    .max(500, 'Definition must be 500 characters or less')
    .transform((val) => (val.trim() === '' ? null : val))
    .nullable(),
  contributor: z
    .string()
    .max(50, 'Name must be 50 characters or less')
    .transform((val) => (val.trim() === '' ? null : val))
    .nullable(),
  timestamp: z.date(),
});

export type IdiomFormValues = z.infer<typeof idiomSchema>;
