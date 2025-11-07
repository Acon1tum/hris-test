import { z } from 'zod';
import { CreateOfficeDto } from './create-office.dto';

export const UpdateOfficeDto = CreateOfficeDto.partial();

export type UpdateOfficeDto = z.infer<typeof UpdateOfficeDto>;

