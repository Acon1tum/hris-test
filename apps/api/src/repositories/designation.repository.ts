import { prisma } from '@hris/database';
import type { Designation } from '@hris/database';
import { BaseRepository } from './base.repository';

export class DesignationRepository extends BaseRepository<Designation> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.designation {
    return this.prisma.designation;
  }

  async findByTitle(title: string) {
    return this.prisma.designation.findUnique({
      where: { title },
    });
  }

  async findByCode(code: string) {
    return this.prisma.designation.findUnique({
      where: { code },
    });
  }

  async findActive() {
    return this.prisma.designation.findMany({
      where: { isActive: true },
      orderBy: { level: 'desc' },
    });
  }
}


