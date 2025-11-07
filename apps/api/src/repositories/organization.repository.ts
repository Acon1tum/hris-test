import { prisma } from '@hris/database';
import type { Organization } from '@hris/database';
import { BaseRepository } from './base.repository';

export class OrganizationRepository extends BaseRepository<Organization> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.organization {
    return this.prisma.organization;
  }

  async findBySlug(slug: string) {
    return this.prisma.organization.findUnique({
      where: { slug },
    });
  }

  async findByName(name: string) {
    return this.prisma.organization.findUnique({
      where: { name },
    });
  }

  async findActive() {
    return this.prisma.organization.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

