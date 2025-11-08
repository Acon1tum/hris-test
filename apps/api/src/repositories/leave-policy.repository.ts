import { prisma } from '@hris/database';
import type { LeavePolicy } from '@hris/database';
import { BaseRepository } from './base.repository';
import { Prisma } from '@hris/database';

export class LeavePolicyRepository extends BaseRepository<LeavePolicy> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.leavePolicy {
    return this.prisma.leavePolicy;
  }

  async findByName(name: string): Promise<Prisma.LeavePolicyGetPayload<{ include: { employmentType: true; leaveType: true } }> | null> {
    return this.prisma.leavePolicy.findUnique({
      where: { name },
      include: {
        employmentType: true,
        leaveType: true,
      },
    });
  }

  async findByEmploymentType(employmentTypeId: string): Promise<Prisma.LeavePolicyGetPayload<{ include: { employmentType: true; leaveType: true } }>[]> {
    return this.prisma.leavePolicy.findMany({
      where: { employmentTypeId },
      include: {
        employmentType: true,
        leaveType: true,
      },
    });
  }

  async findByLeaveType(leaveTypeId: string): Promise<Prisma.LeavePolicyGetPayload<{ include: { employmentType: true; leaveType: true } }>[]> {
    return this.prisma.leavePolicy.findMany({
      where: { leaveTypeId },
      include: {
        employmentType: true,
        leaveType: true,
      },
    });
  }

  async findActive(): Promise<Prisma.LeavePolicyGetPayload<{ include: { employmentType: true; leaveType: true } }>[]> {
    return this.prisma.leavePolicy.findMany({
      where: { isActive: true },
      include: {
        employmentType: true,
        leaveType: true,
      },
      orderBy: { name: 'asc' },
    });
  }
}

