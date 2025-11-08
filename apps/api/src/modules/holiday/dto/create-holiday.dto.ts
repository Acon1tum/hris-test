import { z } from 'zod';

export const CreateHolidayDto = z.object({
  name: z.string().min(1, 'Name is required'),
  date: z.string().or(z.date()),
  year: z.number().int().min(2000).max(2100),
  description: z.string().optional().nullable(),
  isRecurring: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export type CreateHolidayDto = z.infer<typeof CreateHolidayDto>;

