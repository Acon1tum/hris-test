import { prisma } from '@hris/database';
import type { Grade } from '@hris/database';
import { BaseRepository } from './base.repository';

export class GradeRepository extends BaseRepository<Grade> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.grade {
    return this.prisma.grade;
  }

  async findByName(name: string) {
    return this.prisma.grade.findUnique({
      where: { name },
    });
  }

  async findByCode(code: string) {
    return this.prisma.grade.findUnique({
      where: { code },
    });
  }

  async findActive() {
    return this.prisma.grade.findMany({
      where: { isActive: true },
      orderBy: { level: 'desc' },
    });
  }
}

