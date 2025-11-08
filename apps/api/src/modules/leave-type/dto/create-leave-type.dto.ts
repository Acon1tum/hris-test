import { z } from 'zod';

export const CreateLeaveTypeDto = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().optional().nullable(),
  daysPerYear: z.number().int().min(0),
  requiresApproval: z.boolean().default(true),
  isActive: z.boolean().default(true),
  applicableAfter: z.number().int().min(0).optional().nullable(),
  maxConsecutiveLeaves: z.number().int().min(0).optional().nullable(),
  earnedLeaveFrequency: z.string().optional().nullable(),
  allocateOnDay: z.string().optional().nullable(),
  nonEncashableLeaves: z.number().int().min(0).optional().nullable(),
  fractionOfDailySalary: z.number().min(0).max(1).optional().nullable(),
  maxEncashableLeaves: z.number().int().min(0).optional().nullable(),
  maxCarryForward: z.number().int().min(0).default(0),
  isEarnedLeave: z.boolean().default(false),
  isPartiallyPaidLeave: z.boolean().default(false),
  allowOverAllocation: z.boolean().default(false),
  isEncashmentAllowed: z.boolean().default(false),
  isCarryForward: z.boolean().default(false),
  isOptionalLeave: z.boolean().default(false),
  includeHolidaysWithinLeaves: z.boolean().default(false),
  isLeaveWithoutPay: z.boolean().default(false),
  allowNegativeBalance: z.boolean().default(false),
  isCompensatory: z.boolean().default(false),
  isIncrementalLeave: z.boolean().default(false),
});

export type CreateLeaveTypeDto = z.infer<typeof CreateLeaveTypeDto>;

