import { z } from 'zod';
import { CreateGradeDto } from './create-grade.dto';

export const UpdateGradeDto = CreateGradeDto.partial();

export type UpdateGradeDto = z.infer<typeof UpdateGradeDto>;


