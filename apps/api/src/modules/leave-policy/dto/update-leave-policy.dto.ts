import { z } from 'zod';
import { CreateLeavePolicyDto } from './create-leave-policy.dto';

export const UpdateLeavePolicyDto = CreateLeavePolicyDto.partial();

export type UpdateLeavePolicyDto = z.infer<typeof UpdateLeavePolicyDto>;

