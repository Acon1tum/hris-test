import { prisma } from '@hris/database';
import type { Role } from '@hris/database';
import { BaseRepository } from './base.repository';

export class RoleRepository extends BaseRepository<Role> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.role {
    return this.prisma.role;
  }

  async findByName(name: string) {
    return this.prisma.role.findUnique({
      where: { name },
    });
  }

  async findByIdWithDetails(roleId: string) {
    return this.prisma.role.findUnique({
      where: { id: roleId },
      include: {
        rolePermissions: {
          include: {
            permission: {
              include: { module: true },
            },
          },
        },
        roleModules: {
          include: { module: true },
        },
        _count: {
          select: { userRoles: true },
        },
      },
    });
  }

  async findAllWithDetails(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;

    const [roles, total] = await Promise.all([
      this.prisma.role.findMany({
        skip,
        take: pageSize,
        include: {
          rolePermissions: {
            include: { permission: true },
          },
          roleModules: {
            include: { module: true },
          },
          _count: {
            select: { userRoles: true },
          },
        },
        orderBy: { priority: 'desc' },
      }),
      this.prisma.role.count(),
    ]);

    return { roles, total };
  }

  async createRolePermission(roleId: string, permissionId: string) {
    return this.prisma.rolePermission.create({
      data: {
        roleId,
        permissionId,
      },
    });
  }

  async deleteRolePermissions(roleId: string) {
    return this.prisma.rolePermission.deleteMany({
      where: { roleId },
    });
  }

  async createRolePermissions(roleId: string, permissionIds: string[]) {
    return this.prisma.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      })),
    });
  }

  async createRoleModule(roleId: string, moduleId: string, canAccess = true) {
    return this.prisma.roleModule.create({
      data: {
        roleId,
        moduleId,
        canAccess,
      },
    });
  }

  async deleteRoleModules(roleId: string) {
    return this.prisma.roleModule.deleteMany({
      where: { roleId },
    });
  }

  async createRoleModules(roleId: string, moduleIds: string[], canAccess = true) {
    return this.prisma.roleModule.createMany({
      data: moduleIds.map((moduleId) => ({
        roleId,
        moduleId,
        canAccess,
      })),
    });
  }

  async getRoleModules(roleId: string, moduleId: string) {
    return this.prisma.roleModule.findMany({
      where: {
        roleId,
        moduleId,
      },
      include: {
        module: true,
      },
    });
  }
}

