import { overtimePolicyRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateOvertimePolicyDto, UpdateOvertimePolicyDto } from './dto';
import { Prisma } from '@hris/database';

export class OvertimePolicyService {
  async create(dto: CreateOvertimePolicyDto): Promise<Prisma.OvertimePolicyGetPayload<any>> {
    const existingByName = await overtimePolicyRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Overtime policy with this name already exists');
    }

    return overtimePolicyRepository.create(dto);
  }

  async getAll(): Promise<Prisma.OvertimePolicyGetPayload<any>[]> {
    return overtimePolicyRepository.findMany(
      undefined,
      undefined,
      { name: 'asc' },
      undefined,
      undefined
    );
  }

  async getById(id: string): Promise<Prisma.OvertimePolicyGetPayload<any>> {
    const overtimePolicy = await overtimePolicyRepository.findById(id);
    if (!overtimePolicy) {
      throw new ApiError(404, 'Overtime policy not found');
    }
    return overtimePolicy;
  }

  async update(id: string, dto: UpdateOvertimePolicyDto): Promise<Prisma.OvertimePolicyGetPayload<any>> {
    const overtimePolicy = await overtimePolicyRepository.findById(id);
    if (!overtimePolicy) {
      throw new ApiError(404, 'Overtime policy not found');
    }

    if (dto.name && dto.name !== overtimePolicy.name) {
      const existing = await overtimePolicyRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Overtime policy with this name already exists');
      }
    }

    return overtimePolicyRepository.update(id, dto);
  }

  async delete(id: string) {
    const overtimePolicy = await overtimePolicyRepository.findById(id);
    if (!overtimePolicy) {
      throw new ApiError(404, 'Overtime policy not found');
    }

    await overtimePolicyRepository.delete(id);
    return { message: 'Overtime policy deleted successfully' };
  }
}

