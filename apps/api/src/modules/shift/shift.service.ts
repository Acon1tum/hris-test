import { shiftRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateShiftDto, UpdateShiftDto } from './dto';
import { Prisma } from '@hris/database';

export class ShiftService {
  async create(dto: CreateShiftDto): Promise<Prisma.ShiftGetPayload<any>> {
    const existingByName = await shiftRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Shift with this name already exists');
    }

    const existingByCode = await shiftRepository.findByCode(dto.code);
    if (existingByCode) {
      throw new ApiError(400, 'Shift with this code already exists');
    }

    return shiftRepository.create(dto);
  }

  async getAll(): Promise<Prisma.ShiftGetPayload<any>[]> {
    return shiftRepository.findMany(
      undefined,
      undefined,
      { startTime: 'asc' },
      undefined,
      undefined
    );
  }

  async getById(id: string): Promise<Prisma.ShiftGetPayload<any>> {
    const shift = await shiftRepository.findById(id);
    if (!shift) {
      throw new ApiError(404, 'Shift not found');
    }
    return shift;
  }

  async update(id: string, dto: UpdateShiftDto): Promise<Prisma.ShiftGetPayload<any>> {
    const shift = await shiftRepository.findById(id);
    if (!shift) {
      throw new ApiError(404, 'Shift not found');
    }

    if (dto.name && dto.name !== shift.name) {
      const existing = await shiftRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Shift with this name already exists');
      }
    }

    if (dto.code && dto.code !== shift.code) {
      const existing = await shiftRepository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Shift with this code already exists');
      }
    }

    return shiftRepository.update(id, dto);
  }

  async delete(id: string) {
    const shift = await shiftRepository.findById(id);
    if (!shift) {
      throw new ApiError(404, 'Shift not found');
    }

    await shiftRepository.delete(id);
    return { message: 'Shift deleted successfully' };
  }
}

