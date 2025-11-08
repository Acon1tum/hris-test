import { prisma } from '@hris/database';
import type { GraceTime } from '@hris/database';
import { BaseRepository } from './base.repository';

export class GraceTimeRepository extends BaseRepository<GraceTime> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.graceTime {
    return this.prisma.graceTime;
  }

  async findByOrganization(organizationId: string) {
    return this.prisma.graceTime.findUnique({
      where: { organizationId },
      include: {
        organization: true,
      },
    });
  }

  async findOrCreateByOrganization(organizationId: string, data?: Partial<GraceTime>) {
    const existing = await this.findByOrganization(organizationId);
    if (existing) {
      return existing;
    }

    return this.model.create({
      data: {
        organizationId,
        arrivalGraceEnabled: data?.arrivalGraceEnabled ?? true,
        arrivalGraceTime: data?.arrivalGraceTime ?? 10,
        departureGraceEnabled: data?.departureGraceEnabled ?? true,
        departureGraceTime: data?.departureGraceTime ?? 15,
        breakGraceEnabled: data?.breakGraceEnabled ?? true,
        breakGraceTime: data?.breakGraceTime ?? 5,
        earlyLeaveGraceEnabled: data?.earlyLeaveGraceEnabled ?? true,
        earlyLeaveGraceTime: data?.earlyLeaveGraceTime ?? 30,
      },
      include: {
        organization: true,
      },
    });
  }
}

