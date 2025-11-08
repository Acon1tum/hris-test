import { leavePolicyRepository, employmentTypeRepository, leaveTypeRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateLeavePolicyDto, UpdateLeavePolicyDto } from './dto';

export class LeavePolicyService {
  async create(dto: CreateLeavePolicyDto) {
    const existingByName = await leavePolicyRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Leave policy with this name already exists');
    }

    if (dto.employmentTypeId) {
      const employmentType = await employmentTypeRepository.findById(dto.employmentTypeId);
      if (!employmentType) {
        throw new ApiError(400, 'Employment type not found');
      }
    }

    if (dto.leaveTypeId) {
      const leaveType = await leaveTypeRepository.findById(dto.leaveTypeId);
      if (!leaveType) {
        throw new ApiError(400, 'Leave type not found');
      }
    }

    return leavePolicyRepository.create(dto);
  }

  async getAll() {
    return leavePolicyRepository.findMany(
      undefined,
      {
        employmentType: true,
        leaveType: true,
      },
      { name: 'asc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const leavePolicy = await leavePolicyRepository.findById(id);
    if (!leavePolicy) {
      throw new ApiError(404, 'Leave policy not found');
    }
    return leavePolicy;
  }

  async update(id: string, dto: UpdateLeavePolicyDto) {
    const leavePolicy = await leavePolicyRepository.findById(id);
    if (!leavePolicy) {
      throw new ApiError(404, 'Leave policy not found');
    }

    if (dto.name && dto.name !== leavePolicy.name) {
      const existing = await leavePolicyRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Leave policy with this name already exists');
      }
    }

    if (dto.employmentTypeId) {
      const employmentType = await employmentTypeRepository.findById(dto.employmentTypeId);
      if (!employmentType) {
        throw new ApiError(400, 'Employment type not found');
      }
    }

    if (dto.leaveTypeId) {
      const leaveType = await leaveTypeRepository.findById(dto.leaveTypeId);
      if (!leaveType) {
        throw new ApiError(400, 'Leave type not found');
      }
    }

    return leavePolicyRepository.update(id, dto);
  }

  async delete(id: string) {
    const leavePolicy = await leavePolicyRepository.findById(id);
    if (!leavePolicy) {
      throw new ApiError(404, 'Leave policy not found');
    }

    await leavePolicyRepository.delete(id);
    return { message: 'Leave policy deleted successfully' };
  }
}


