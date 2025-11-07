import { prisma } from '@hris/database';
import type { PrismaClient } from '@hris/database';

export abstract class BaseRepository<T> {
  protected prisma: typeof prisma;

  constructor(prismaInstance: typeof prisma = prisma) {
    this.prisma = prismaInstance;
  }

  abstract get model(): any;

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async findMany(where?: any, include?: any, orderBy?: any, skip?: number, take?: number): Promise<T[]> {
    return this.model.findMany({
      where,
      include,
      orderBy,
      skip,
      take,
    });
  }

  async findUnique(where: any, include?: any): Promise<T | null> {
    return this.model.findUnique({
      where,
      include,
    });
  }

  async findFirst(where?: any, include?: any): Promise<T | null> {
    return this.model.findFirst({
      where,
      include,
    });
  }

  async create(data: any): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: any): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }

  async deleteMany(where: any): Promise<{ count: number }> {
    return this.model.deleteMany({ where });
  }

  async count(where?: any): Promise<number> {
    return this.model.count({ where });
  }

  async createMany(data: any[]): Promise<{ count: number }> {
    return this.model.createMany({ data });
  }
}

