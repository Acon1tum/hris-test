import { ApiError } from '../../utils/errors';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { organizationRepository } from '../../repositories';

export class OrganizationService {
  async create(dto: CreateOrganizationDto) {
    // Check if organization with same name exists
    const existingByName = await organizationRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Organization with this name already exists');
    }

    // Check if organization with same slug exists
    const existingBySlug = await organizationRepository.findBySlug(dto.slug);
    if (existingBySlug) {
      throw new ApiError(400, 'Organization with this slug already exists');
    }

    const organization = await organizationRepository.create({
      name: dto.name,
      slug: dto.slug,
      currencyCode: dto.currencyCode,
      dayFormat: dto.dayFormat,
      timeFormat: dto.timeFormat,
      timeZone: dto.timeZone,
      domain: dto.domain || null,
      employeeIdLabel: dto.employeeIdLabel,
      avatar: dto.avatar || null,
      isActive: dto.isActive ?? true,
    });

    return organization;
  }

  async getAll() {
    return organizationRepository.findMany(
      undefined,
      undefined,
      { createdAt: 'desc' }
    );
  }

  async getById(id: string) {
    const organization = await organizationRepository.findById(id);
    if (!organization) {
      throw new ApiError(404, 'Organization not found');
    }
    return organization;
  }

  async getBySlug(slug: string) {
    const organization = await organizationRepository.findBySlug(slug);
    if (!organization) {
      throw new ApiError(404, 'Organization not found');
    }
    return organization;
  }

  async update(id: string, dto: UpdateOrganizationDto) {
    const organization = await organizationRepository.findById(id);
    if (!organization) {
      throw new ApiError(404, 'Organization not found');
    }

    // Check if name is being updated and if it conflicts
    if (dto.name && dto.name !== organization.name) {
      const existingByName = await organizationRepository.findByName(dto.name);
      if (existingByName) {
        throw new ApiError(400, 'Organization with this name already exists');
      }
    }

    // Check if slug is being updated and if it conflicts
    if (dto.slug && dto.slug !== organization.slug) {
      const existingBySlug = await organizationRepository.findBySlug(dto.slug);
      if (existingBySlug) {
        throw new ApiError(400, 'Organization with this slug already exists');
      }
    }

    const updated = await organizationRepository.update(id, {
      ...dto,
      domain: dto.domain === undefined ? organization.domain : dto.domain,
      avatar: dto.avatar === undefined ? organization.avatar : dto.avatar,
    });

    return updated;
  }

  async delete(id: string) {
    const organization = await organizationRepository.findById(id);
    if (!organization) {
      throw new ApiError(404, 'Organization not found');
    }

    await organizationRepository.delete(id);
    return { message: 'Organization deleted successfully' };
  }
}

