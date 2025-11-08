import { z } from 'zod';

export const CreateOvertimePolicyDto = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().nullable(),
  overtimePayComponent: z.string().optional().nullable(),
  regularHoursPerDay: z.number().int().min(0).default(8),
  regularHoursPerWeek: z.number().int().min(0).default(40),
  weekdayOvertimeMultiplier: z.number().min(0).default(1.5),
  weekendMultiplier: z.number().min(0).default(1.5),
  holidayMultiplier: z.number().min(0).default(2.0),
  maxDailyOvertimeHours: z.number().int().min(0).optional().nullable(),
  maxWeeklyOvertimeHours: z.number().int().min(0).optional().nullable(),
  maxMonthlyOvertimeHours: z.number().int().min(0).optional().nullable(),
  calculateBasedOn: z.string().default('total-gross'),
  applicableAfterWorkingDays: z.number().int().min(0).optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateOvertimePolicyDto = z.infer<typeof CreateOvertimePolicyDto>;


