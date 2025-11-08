import { z } from 'zod';

export const CreateExpenseAccountDto = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  description: z.string().optional().nullable(),
  expenseType: z.string().optional().nullable(),
  account: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateExpenseAccountDto = z.infer<typeof CreateExpenseAccountDto>;

