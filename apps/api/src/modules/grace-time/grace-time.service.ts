import { graceTimeRepository, organizationRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateGraceTimeDto, UpdateGraceTimeDto } from './dto';

export class GraceTimeService {
  async create(dto: CreateGraceTimeDto) {
    const organization = await organizationRepository.findById(dto.organizationId);
    if (!organization) {
      throw new ApiError(400, 'Organization not found');
    }

    const existing = await graceTimeRepository.findByOrganization(dto.organizationId);
    if (existing) {
      throw new ApiError(400, 'Grace time configuration already exists for this organization');
    }

    return graceTimeRepository.create(dto);
  }

  async getAll() {
    return graceTimeRepository.findMany(
      undefined,
      {
        organization: true,
      },
      { createdAt: 'desc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const graceTime = await graceTimeRepository.findById(id);
    if (!graceTime) {
      throw new ApiError(404, 'Grace time configuration not found');
    }
    return graceTime;
  }

  async getByOrganization(organizationId: string) {
    const graceTime = await graceTimeRepository.findOrCreateByOrganization(organizationId);
    return graceTime;
  }

  async update(id: string, dto: UpdateGraceTimeDto) {
    const graceTime = await graceTimeRepository.findById(id);
    if (!graceTime) {
      throw new ApiError(404, 'Grace time configuration not found');
    }

    return graceTimeRepository.update(id, dto);
  }

  async updateByOrganization(organizationId: string, dto: UpdateGraceTimeDto) {
    const graceTime = await graceTimeRepository.findOrCreateByOrganization(organizationId);
    return graceTimeRepository.update(graceTime.id, dto);
  }

  async delete(id: string) {
    const graceTime = await graceTimeRepository.findById(id);
    if (!graceTime) {
      throw new ApiError(404, 'Grace time configuration not found');
    }

    await graceTimeRepository.delete(id);
    return { message: 'Grace time configuration deleted successfully' };
  }
}


