import { z } from 'zod';

export const CreateDepartmentDto = z.object({
  name: z.string().min(1, 'Department name is required'),
  code: z.string().min(1, 'Department code is required'),
  description: z.string().optional().nullable(),
  parentDepartmentId: z.string().optional().nullable(),
  officeId: z.string().optional().nullable(),
  departmentHeadId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateDepartmentDto = z.infer<typeof CreateDepartmentDto>;


