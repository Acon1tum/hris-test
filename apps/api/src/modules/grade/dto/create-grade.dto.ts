import { z } from 'zod';

export const CreateGradeDto = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  level: z.number().int().min(1),
  description: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateGradeDto = z.infer<typeof CreateGradeDto>;

