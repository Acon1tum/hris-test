import { z } from 'zod';

export const CreateLeavePolicyDto = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().nullable(),
  employmentTypeId: z.string().optional().nullable(),
  leaveTypeId: z.string().optional().nullable(),
  numberOfDays: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type CreateLeavePolicyDto = z.infer<typeof CreateLeavePolicyDto>;

