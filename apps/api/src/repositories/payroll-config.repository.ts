import { prisma } from '@hris/database';
import type { PayrollConfig } from '@hris/database';
import { BaseRepository } from './base.repository';

export class PayrollConfigRepository extends BaseRepository<PayrollConfig> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.payrollConfig {
    return this.prisma.payrollConfig;
  }

  async findByOrganization(organizationId: string) {
    return this.prisma.payrollConfig.findMany({
      where: { organizationId },
      include: {
        organization: true,
      },
    });
  }

  async findActive() {
    return this.prisma.payrollConfig.findMany({
      include: {
        organization: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

