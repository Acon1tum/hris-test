import { z } from 'zod';
import { CreatePayrollConfigDto } from './create-payroll-config.dto';

export const UpdatePayrollConfigDto = CreatePayrollConfigDto.partial();

export type UpdatePayrollConfigDto = z.infer<typeof UpdatePayrollConfigDto>;


