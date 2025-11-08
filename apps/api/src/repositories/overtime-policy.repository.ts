import { prisma } from '@hris/database';
import type { OvertimePolicy } from '@hris/database';
import { BaseRepository } from './base.repository';
import { Prisma } from '@hris/database';

export class OvertimePolicyRepository extends BaseRepository<OvertimePolicy> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.overtimePolicy {
    return this.prisma.overtimePolicy;
  }

  async findByName(name: string): Promise<Prisma.OvertimePolicyGetPayload<any> | null> {
    return this.prisma.overtimePolicy.findUnique({
      where: { name },
    });
  }

  async findActive(): Promise<Prisma.OvertimePolicyGetPayload<any>[]> {
    return this.prisma.overtimePolicy.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}

