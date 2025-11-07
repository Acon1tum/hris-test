import { prisma } from '@hris/database';
import type { Module } from '@hris/database';
import { BaseRepository } from './base.repository';

export class ModuleRepository extends BaseRepository<Module> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.module {
    return this.prisma.module;
  }

  async findBySlug(slug: string) {
    return this.prisma.module.findUnique({
      where: { slug },
    });
  }
}

