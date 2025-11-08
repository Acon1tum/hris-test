import { expenseAccountRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateExpenseAccountDto, UpdateExpenseAccountDto } from './dto';

export class ExpenseAccountService {
  async create(dto: CreateExpenseAccountDto) {
    const existingByName = await expenseAccountRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Expense account with this name already exists');
    }

    const existingByCode = await expenseAccountRepository.findByCode(dto.code);
    if (existingByCode) {
      throw new ApiError(400, 'Expense account with this code already exists');
    }

    const existingByAccountNumber = await expenseAccountRepository.findByAccountNumber(dto.accountNumber);
    if (existingByAccountNumber) {
      throw new ApiError(400, 'Expense account with this account number already exists');
    }

    return expenseAccountRepository.create(dto);
  }

  async getAll() {
    return expenseAccountRepository.findMany(
      undefined,
      undefined,
      { name: 'asc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const expenseAccount = await expenseAccountRepository.findById(id);
    if (!expenseAccount) {
      throw new ApiError(404, 'Expense account not found');
    }
    return expenseAccount;
  }

  async update(id: string, dto: UpdateExpenseAccountDto) {
    const expenseAccount = await expenseAccountRepository.findById(id);
    if (!expenseAccount) {
      throw new ApiError(404, 'Expense account not found');
    }

    if (dto.name && dto.name !== expenseAccount.name) {
      const existing = await expenseAccountRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Expense account with this name already exists');
      }
    }

    if (dto.code && dto.code !== expenseAccount.code) {
      const existing = await expenseAccountRepository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Expense account with this code already exists');
      }
    }

    if (dto.accountNumber && dto.accountNumber !== expenseAccount.accountNumber) {
      const existing = await expenseAccountRepository.findByAccountNumber(dto.accountNumber);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Expense account with this account number already exists');
      }
    }

    return expenseAccountRepository.update(id, dto);
  }

  async delete(id: string) {
    const expenseAccount = await expenseAccountRepository.findById(id);
    if (!expenseAccount) {
      throw new ApiError(404, 'Expense account not found');
    }

    await expenseAccountRepository.delete(id);
    return { message: 'Expense account deleted successfully' };
  }
}

