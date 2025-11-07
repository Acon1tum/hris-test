import { z } from 'zod';

export const AssignPermissionDto = z.object({
  roleId: z.string().min(1, 'Role ID is required'),
  permissionIds: z.array(z.string()).min(1, 'At least one permission is required'),
});

export type AssignPermissionDto = z.infer<typeof AssignPermissionDto>;

