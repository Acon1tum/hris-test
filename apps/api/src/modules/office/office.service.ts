import { officeRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateOfficeDto, UpdateOfficeDto } from './dto';

export class OfficeService {
  async create(dto: CreateOfficeDto) {
    // Check if office with same name already exists
    const existing = await officeRepository.findByName(dto.name);
    if (existing) {
      throw new ApiError(400, 'Office with this name already exists');
    }

    return officeRepository.createWithRelations(dto);
  }

  async getAll() {
    return officeRepository.findMany(
      undefined,
      {
        phoneNumbers: true,
        emailAddresses: true,
      },
      { createdAt: 'desc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const office = await officeRepository.findByIdWithRelations(id);
    if (!office) {
      throw new ApiError(404, 'Office not found');
    }
    return office;
  }

  async update(id: string, dto: UpdateOfficeDto) {
    const office = await officeRepository.findById(id);
    if (!office) {
      throw new ApiError(404, 'Office not found');
    }

    // Check if name is being changed and if it conflicts
    if (dto.name && dto.name !== office.name) {
      const existing = await officeRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Office with this name already exists');
      }
    }

    return officeRepository.updateWithRelations(id, dto);
  }

  async delete(id: string) {
    const office = await officeRepository.findById(id);
    if (!office) {
      throw new ApiError(404, 'Office not found');
    }

    // Check if office has employees assigned
    const officeWithEmployees = await officeRepository.findByIdWithRelations(id);
    if (officeWithEmployees && officeWithEmployees.employees.length > 0) {
      throw new ApiError(400, 'Cannot delete office with assigned employees. Please reassign employees first.');
    }

    await officeRepository.delete(id);
    return { message: 'Office deleted successfully' };
  }
}

