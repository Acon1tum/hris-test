import { z } from 'zod';
import { CreateOvertimePolicyDto } from './create-overtime-policy.dto';

export const UpdateOvertimePolicyDto = CreateOvertimePolicyDto.partial();

export type UpdateOvertimePolicyDto = z.infer<typeof UpdateOvertimePolicyDto>;


