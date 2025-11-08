import { prisma } from '@hris/database';
import type { Shift } from '@hris/database';
import { BaseRepository } from './base.repository';
import { Prisma } from '@hris/database';

export class ShiftRepository extends BaseRepository<Shift> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.shift {
    return this.prisma.shift;
  }

  async findByName(name: string): Promise<Prisma.ShiftGetPayload<any> | null> {
    return this.prisma.shift.findUnique({
      where: { name },
    });
  }

  async findByCode(code: string): Promise<Prisma.ShiftGetPayload<any> | null> {
    return this.prisma.shift.findUnique({
      where: { code },
    });
  }

  async findActive(): Promise<Prisma.ShiftGetPayload<any>[]> {
    return this.prisma.shift.findMany({
      where: { isActive: true },
      orderBy: { startTime: 'asc' },
    });
  }
}

