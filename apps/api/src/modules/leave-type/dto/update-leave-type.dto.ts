import { z } from 'zod';
import { CreateLeaveTypeDto } from './create-leave-type.dto';

export const UpdateLeaveTypeDto = CreateLeaveTypeDto.partial();

export type UpdateLeaveTypeDto = z.infer<typeof UpdateLeaveTypeDto>;

