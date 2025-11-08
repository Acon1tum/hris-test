import { employmentTypeRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateEmploymentTypeDto, UpdateEmploymentTypeDto } from './dto';

export class EmploymentTypeService {
  async create(dto: CreateEmploymentTypeDto) {
    const existingByName = await employmentTypeRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Employment type with this name already exists');
    }

    const existingByCode = await employmentTypeRepository.findByCode(dto.code);
    if (existingByCode) {
      throw new ApiError(400, 'Employment type with this code already exists');
    }

    return employmentTypeRepository.create(dto);
  }

  async getAll() {
    return employmentTypeRepository.findMany(
      undefined,
      undefined,
      { name: 'asc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const employmentType = await employmentTypeRepository.findById(id);
    if (!employmentType) {
      throw new ApiError(404, 'Employment type not found');
    }
    return employmentType;
  }

  async update(id: string, dto: UpdateEmploymentTypeDto) {
    const employmentType = await employmentTypeRepository.findById(id);
    if (!employmentType) {
      throw new ApiError(404, 'Employment type not found');
    }

    if (dto.name && dto.name !== employmentType.name) {
      const existing = await employmentTypeRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Employment type with this name already exists');
      }
    }

    if (dto.code && dto.code !== employmentType.code) {
      const existing = await employmentTypeRepository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Employment type with this code already exists');
      }
    }

    return employmentTypeRepository.update(id, dto);
  }

  async delete(id: string) {
    const employmentType = await employmentTypeRepository.findById(id);
    if (!employmentType) {
      throw new ApiError(404, 'Employment type not found');
    }

    await employmentTypeRepository.delete(id);
    return { message: 'Employment type deleted successfully' };
  }
}

