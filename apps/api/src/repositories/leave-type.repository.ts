import { prisma } from '@hris/database';
import type { LeaveType } from '@hris/database';
import { BaseRepository } from './base.repository';
import { Prisma } from '@hris/database';

export class LeaveTypeRepository extends BaseRepository<LeaveType> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.leaveType {
    return this.prisma.leaveType;
  }

  async findByName(name: string): Promise<Prisma.LeaveTypeGetPayload<any> | null> {
    return this.prisma.leaveType.findUnique({
      where: { name },
    });
  }

  async findByCode(code: string): Promise<Prisma.LeaveTypeGetPayload<any> | null> {
    return this.prisma.leaveType.findUnique({
      where: { code },
    });
  }

  async findActive(): Promise<Prisma.LeaveTypeGetPayload<any>[]> {
    return this.prisma.leaveType.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}

