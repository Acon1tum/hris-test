import { z } from 'zod';

export const CreateDesignationDto = z.object({
  title: z.string().min(1, 'Title is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().optional().nullable(),
  level: z.number().int().min(1).default(1),
  isActive: z.boolean().default(true),
  permissionIds: z.array(z.string()).optional().default([]),
});

export type CreateDesignationDto = z.infer<typeof CreateDesignationDto>;


