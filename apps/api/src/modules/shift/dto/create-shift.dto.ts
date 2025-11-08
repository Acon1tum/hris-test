import { z } from 'zod';

export const CreateShiftDto = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, 'Invalid time format'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, 'Invalid time format'),
  days: z.string().optional().nullable(),
  breakDuration: z.number().min(0).optional().nullable(),
  overtimeMultiplier: z.number().min(0).optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateShiftDto = z.infer<typeof CreateShiftDto>;

