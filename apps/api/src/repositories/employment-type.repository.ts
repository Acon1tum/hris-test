import { prisma } from '@hris/database';
import type { EmploymentTypeModel } from '@hris/database';
import { BaseRepository } from './base.repository';

export class EmploymentTypeRepository extends BaseRepository<EmploymentTypeModel> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.employmentTypeModel {
    return this.prisma.employmentTypeModel;
  }

  async findByName(name: string) {
    return this.prisma.employmentTypeModel.findUnique({
      where: { name },
    });
  }

  async findByCode(code: string) {
    return this.prisma.employmentTypeModel.findUnique({
      where: { code },
    });
  }

  async findActive() {
    return this.prisma.employmentTypeModel.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}

