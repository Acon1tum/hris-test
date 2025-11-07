import { z } from 'zod';

export const CreateRoleDto = z.object({
  name: z.string().min(1, 'Role name is required'),
  description: z.string().optional(),
  priority: z.number().int().optional(),
});

export type CreateRoleDto = z.infer<typeof CreateRoleDto>;

