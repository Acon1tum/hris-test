import { designationRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateDesignationDto, UpdateDesignationDto } from './dto';
import { prisma } from '@hris/database';

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

    const { permissionIds, ...designationData } = dto;

    // Create designation with permissions in a transaction
    const designation = await prisma.$transaction(async (tx) => {
      const newDesignation = await tx.designation.create({
        data: designationData,
      });

      if (permissionIds && permissionIds.length > 0) {
        await tx.designationPermission.createMany({
          data: permissionIds.map((permissionId) => ({
            designationId: newDesignation.id,
            permissionId,
          })),
        });
      }

      return newDesignation;
    });

    return designationRepository.findByIdWithPermissions(designation.id);
  }

  async getAll() {
    return designationRepository.findMany(
      undefined,
      {
        designationPermissions: {
          include: {
            permission: {
              include: {
                module: true,
              },
            },
          },
        },
      },
      { level: 'desc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const designation = await designationRepository.findByIdWithPermissions(id);
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

    const { permissionIds, ...designationData } = dto;

    // Update designation and permissions in a transaction
    const updatedDesignation = await prisma.$transaction(async (tx) => {
      // Update designation fields
      const updated = await tx.designation.update({
        where: { id },
        data: designationData,
      });

      // Update permissions if provided
      if (permissionIds !== undefined) {
        // Remove existing permissions
        await tx.designationPermission.deleteMany({
          where: { designationId: id },
        });

        // Add new permissions
        if (permissionIds.length > 0) {
          await tx.designationPermission.createMany({
            data: permissionIds.map((permissionId) => ({
              designationId: id,
              permissionId,
            })),
          });
        }
      }

      return updated;
    });

    return designationRepository.findByIdWithPermissions(updatedDesignation.id);
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


