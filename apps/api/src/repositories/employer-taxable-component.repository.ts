import { prisma } from '@hris/database';
import type { EmployerTaxableComponent } from '@hris/database';
import { BaseRepository } from './base.repository';
import { Prisma } from '@hris/database';

export class EmployerTaxableComponentRepository extends BaseRepository<EmployerTaxableComponent> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.employerTaxableComponent {
    return this.prisma.employerTaxableComponent;
  }

  async findByName(name: string): Promise<Prisma.EmployerTaxableComponentGetPayload<any> | null> {
    return this.prisma.employerTaxableComponent.findUnique({
      where: { name },
    });
  }

  async findByCode(code: string): Promise<Prisma.EmployerTaxableComponentGetPayload<any> | null> {
    return this.prisma.employerTaxableComponent.findUnique({
      where: { code },
    });
  }

  async findByType(type: string): Promise<Prisma.EmployerTaxableComponentGetPayload<any>[]> {
    return this.prisma.employerTaxableComponent.findMany({
      where: { type },
    });
  }
}

