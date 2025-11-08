import { z } from 'zod';
import { CreateHolidayDto } from './create-holiday.dto';

export const UpdateHolidayDto = CreateHolidayDto.partial();

export type UpdateHolidayDto = z.infer<typeof UpdateHolidayDto>;

