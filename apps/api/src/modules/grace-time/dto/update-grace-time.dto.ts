import { z } from 'zod';
import { CreateGraceTimeDto } from './create-grace-time.dto';

export const UpdateGraceTimeDto = CreateGraceTimeDto.omit({ organizationId: true }).partial();

export type UpdateGraceTimeDto = z.infer<typeof UpdateGraceTimeDto>;


