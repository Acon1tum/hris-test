import { z } from 'zod';
import { CreateDepartmentDto } from './create-department.dto';

export const UpdateDepartmentDto = CreateDepartmentDto.partial();

export type UpdateDepartmentDto = z.infer<typeof UpdateDepartmentDto>;


