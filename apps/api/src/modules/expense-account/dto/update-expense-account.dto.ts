import { z } from 'zod';
import { CreateExpenseAccountDto } from './create-expense-account.dto';

export const UpdateExpenseAccountDto = CreateExpenseAccountDto.partial();

export type UpdateExpenseAccountDto = z.infer<typeof UpdateExpenseAccountDto>;

