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

// Schema for AddExampleForm
export const exampleSchema = z.object({
  newExample: z
    .string()
    .nonempty('Example is required')
    .max(500, 'Example must be 500 characters or less')
    .trim(),
});
export type ExampleFormValues = z.infer<typeof exampleSchema>;

// Schema for UpdateExamplesForm
export const updateExampleSchema = z.object({
  example_id: z.number(),
  example: z.string().nonempty('Example cannot be empty'),
});

export const updateExamplesSchema = z.object({
  examples: z.array(updateExampleSchema).nonempty('At least one example is required'),
});
export type UpdateExamplesFormValues = z.infer<typeof updateExamplesSchema>;
