import { ApiError } from '../../utils/errors';
import { CreateEmployerTaxableComponentDto, UpdateEmployerTaxableComponentDto } from './dto';
import { employerTaxableComponentRepository } from '../../repositories';
import { Prisma } from '@hris/database';

export class EmployerTaxableComponentService {
  async create(dto: CreateEmployerTaxableComponentDto) {
    const existingByName = await employerTaxableComponentRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Employer taxable component with this name already exists');
    }
    const existingByCode = await employerTaxableComponentRepository.findByCode(dto.code);
    if (existingByCode) {
      throw new ApiError(400, 'Employer taxable component with this code already exists');
    }
    return employerTaxableComponentRepository.create(dto);
  }

  async getAll(): Promise<Prisma.EmployerTaxableComponentGetPayload<any>[]> {
    return employerTaxableComponentRepository.findMany(undefined, undefined, { createdAt: 'desc' });
  }

  async getById(id: string): Promise<Prisma.EmployerTaxableComponentGetPayload<any>> {
    const component = await employerTaxableComponentRepository.findById(id);
    if (!component) {
      throw new ApiError(404, 'Employer taxable component not found');
    }
    return component;
  }

  async update(id: string, dto: UpdateEmployerTaxableComponentDto): Promise<Prisma.EmployerTaxableComponentGetPayload<any>> {
    const component = await employerTaxableComponentRepository.findById(id);
    if (!component) {
      throw new ApiError(404, 'Employer taxable component not found');
    }
    if (dto.name && dto.name !== component.name) {
      const existingByName = await employerTaxableComponentRepository.findByName(dto.name);
      if (existingByName) {
        throw new ApiError(400, 'Employer taxable component with this name already exists');
      }
    }
    if (dto.code && dto.code !== component.code) {
      const existingByCode = await employerTaxableComponentRepository.findByCode(dto.code);
      if (existingByCode) {
        throw new ApiError(400, 'Employer taxable component with this code already exists');
      }
    }
    return employerTaxableComponentRepository.update(id, dto);
  }

  async delete(id: string) {
    const component = await employerTaxableComponentRepository.findById(id);
    if (!component) {
      throw new ApiError(404, 'Employer taxable component not found');
    }
    await employerTaxableComponentRepository.delete(id);
    return { message: 'Employer taxable component deleted successfully' };
  }
}


