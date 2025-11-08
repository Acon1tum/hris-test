import { leaveTypeRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from './dto';
import { Prisma } from '@hris/database';

export class LeaveTypeService {
  async create(dto: CreateLeaveTypeDto): Promise<Prisma.LeaveTypeGetPayload<any>> {
    const existingByName = await leaveTypeRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Leave type with this name already exists');
    }

    const existingByCode = await leaveTypeRepository.findByCode(dto.code);
    if (existingByCode) {
      throw new ApiError(400, 'Leave type with this code already exists');
    }

    return leaveTypeRepository.create(dto);
  }

  async getAll(): Promise<Prisma.LeaveTypeGetPayload<any>[]> {
    return leaveTypeRepository.findMany(
      undefined,
      undefined,
      { name: 'asc' },
      undefined,
      undefined
    );
  }

  async getById(id: string): Promise<Prisma.LeaveTypeGetPayload<any>> {
    const leaveType = await leaveTypeRepository.findById(id);
    if (!leaveType) {
      throw new ApiError(404, 'Leave type not found');
    }
    return leaveType;
  }

  async update(id: string, dto: UpdateLeaveTypeDto): Promise<Prisma.LeaveTypeGetPayload<any>> {
    const leaveType = await leaveTypeRepository.findById(id);
    if (!leaveType) {
      throw new ApiError(404, 'Leave type not found');
    }

    if (dto.name && dto.name !== leaveType.name) {
      const existing = await leaveTypeRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Leave type with this name already exists');
      }
    }

    if (dto.code && dto.code !== leaveType.code) {
      const existing = await leaveTypeRepository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Leave type with this code already exists');
      }
    }

    return leaveTypeRepository.update(id, dto);
  }

  async delete(id: string) {
    const leaveType = await leaveTypeRepository.findById(id);
    if (!leaveType) {
      throw new ApiError(404, 'Leave type not found');
    }

    await leaveTypeRepository.delete(id);
    return { message: 'Leave type deleted successfully' };
  }
}

