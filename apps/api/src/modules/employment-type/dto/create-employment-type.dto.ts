import { z } from 'zod';

export const CreateEmploymentTypeDto = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateEmploymentTypeDto = z.infer<typeof CreateEmploymentTypeDto>;

