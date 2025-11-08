import { z } from 'zod';
import { CreateEmploymentTypeDto } from './create-employment-type.dto';

export const UpdateEmploymentTypeDto = CreateEmploymentTypeDto.partial();

export type UpdateEmploymentTypeDto = z.infer<typeof UpdateEmploymentTypeDto>;


