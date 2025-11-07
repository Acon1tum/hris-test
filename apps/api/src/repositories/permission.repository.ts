import { prisma } from '@hris/database';
import type { Permission } from '@hris/database';
import { BaseRepository } from './base.repository';

export class PermissionRepository extends BaseRepository<Permission> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.permission {
    return this.prisma.permission;
  }

  async findBySlug(slug: string) {
    return this.prisma.permission.findUnique({
      where: { slug },
    });
  }

  async findByModule(moduleId: string) {
    return this.prisma.permission.findMany({
      where: { moduleId },
      include: { module: true },
      orderBy: [{ module: { order: 'asc' } }, { resource: 'asc' }],
    });
  }

  async findAllWithModule() {
    return this.prisma.permission.findMany({
      include: { module: true },
      orderBy: [{ module: { order: 'asc' } }, { resource: 'asc' }],
    });
  }
}

