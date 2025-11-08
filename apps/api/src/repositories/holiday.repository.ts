import { prisma } from '@hris/database';
import type { Holiday } from '@hris/database';
import { BaseRepository } from './base.repository';

export class HolidayRepository extends BaseRepository<Holiday> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.holiday {
    return this.prisma.holiday;
  }

  async findByYear(year: number) {
    return this.prisma.holiday.findMany({
      where: { year },
      orderBy: { date: 'asc' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    return this.prisma.holiday.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async findRecurring() {
    return this.prisma.holiday.findMany({
      where: { isRecurring: true },
      orderBy: { date: 'asc' },
    });
  }

  async findActive() {
    return this.prisma.holiday.findMany({
      where: { isActive: true },
      orderBy: { date: 'asc' },
    });
  }
}

