import { designationRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateDesignationDto, UpdateDesignationDto } from './dto';

export class DesignationService {
  async create(dto: CreateDesignationDto) {
    const existingByTitle = await designationRepository.findByTitle(dto.title);
    if (existingByTitle) {
      throw new ApiError(400, 'Designation with this title already exists');
    }

    const existingByCode = await designationRepository.findByCode(dto.code);
    if (existingByCode) {
      throw new ApiError(400, 'Designation with this code already exists');
    }

    return designationRepository.create(dto);
  }

  async getAll() {
    return designationRepository.findMany(
      undefined,
      undefined,
      { level: 'desc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const designation = await designationRepository.findById(id);
    if (!designation) {
      throw new ApiError(404, 'Designation not found');
    }
    return designation;
  }

  async update(id: string, dto: UpdateDesignationDto) {
    const designation = await designationRepository.findById(id);
    if (!designation) {
      throw new ApiError(404, 'Designation not found');
    }

    if (dto.title && dto.title !== designation.title) {
      const existing = await designationRepository.findByTitle(dto.title);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Designation with this title already exists');
      }
    }

    if (dto.code && dto.code !== designation.code) {
      const existing = await designationRepository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Designation with this code already exists');
      }
    }

    return designationRepository.update(id, dto);
  }

  async delete(id: string) {
    const designation = await designationRepository.findById(id);
    if (!designation) {
      throw new ApiError(404, 'Designation not found');
    }

    await designationRepository.delete(id);
    return { message: 'Designation deleted successfully' };
  }
}


