import { z } from 'zod';
import { CreateShiftDto } from './create-shift.dto';

export const UpdateShiftDto = CreateShiftDto.partial();

export type UpdateShiftDto = z.infer<typeof UpdateShiftDto>;

