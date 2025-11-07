import { z } from 'zod';

export const CreatePermissionDto = z.object({
  name: z.string().min(1, 'Permission name is required'),
  slug: z.string().min(1, 'Permission slug is required'),
  description: z.string().optional(),
  moduleId: z.string().min(1, 'Module ID is required'),
  resource: z.string().min(1, 'Resource is required'),
  action: z.string().min(1, 'Action is required'),
});

export type CreatePermissionDto = z.infer<typeof CreatePermissionDto>;

