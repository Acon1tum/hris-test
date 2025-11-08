import { z } from 'zod';
import { CreateDesignationDto } from './create-designation.dto';

export const UpdateDesignationDto = CreateDesignationDto.partial();

export type UpdateDesignationDto = z.infer<typeof UpdateDesignationDto>;


