import { z } from 'zod';

export const CreatePayrollConfigDto = z.object({
  payrollFrequency: z.string().default('monthly'),
  automatedPayroll: z.boolean().default(false),
  organizationId: z.string().optional().nullable(),
});

export type CreatePayrollConfigDto = z.infer<typeof CreatePayrollConfigDto>;


