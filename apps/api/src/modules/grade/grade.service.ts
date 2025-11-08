import { gradeRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateGradeDto, UpdateGradeDto } from './dto';

export class GradeService {
  async create(dto: CreateGradeDto) {
    const existingByName = await gradeRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Grade with this name already exists');
    }

    const existingByCode = await gradeRepository.findByCode(dto.code);
    if (existingByCode) {
      throw new ApiError(400, 'Grade with this code already exists');
    }

    return gradeRepository.create(dto);
  }

  async getAll() {
    return gradeRepository.findMany(
      undefined,
      undefined,
      { level: 'desc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const grade = await gradeRepository.findById(id);
    if (!grade) {
      throw new ApiError(404, 'Grade not found');
    }
    return grade;
  }

  async update(id: string, dto: UpdateGradeDto) {
    const grade = await gradeRepository.findById(id);
    if (!grade) {
      throw new ApiError(404, 'Grade not found');
    }

    if (dto.name && dto.name !== grade.name) {
      const existing = await gradeRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Grade with this name already exists');
      }
    }

    if (dto.code && dto.code !== grade.code) {
      const existing = await gradeRepository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Grade with this code already exists');
      }
    }

    return gradeRepository.update(id, dto);
  }

  async delete(id: string) {
    const grade = await gradeRepository.findById(id);
    if (!grade) {
      throw new ApiError(404, 'Grade not found');
    }

    await gradeRepository.delete(id);
    return { message: 'Grade deleted successfully' };
  }
}

