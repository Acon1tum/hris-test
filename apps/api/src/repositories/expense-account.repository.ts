import { prisma } from '@hris/database';
import type { ExpenseAccount } from '@hris/database';
import { BaseRepository } from './base.repository';

export class ExpenseAccountRepository extends BaseRepository<ExpenseAccount> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.expenseAccount {
    return this.prisma.expenseAccount;
  }

  async findByName(name: string) {
    return this.prisma.expenseAccount.findUnique({
      where: { name },
    });
  }

  async findByCode(code: string) {
    return this.prisma.expenseAccount.findUnique({
      where: { code },
    });
  }

  async findByAccountNumber(accountNumber: string) {
    return this.prisma.expenseAccount.findUnique({
      where: { accountNumber },
    });
  }

  async findActive() {
    return this.prisma.expenseAccount.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}


