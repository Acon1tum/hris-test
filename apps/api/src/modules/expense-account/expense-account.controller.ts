import { Request, Response, NextFunction } from 'express';
import { ExpenseAccountService } from './expense-account.service';
import { CreateExpenseAccountDto, UpdateExpenseAccountDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class ExpenseAccountController {
  private service = new ExpenseAccountService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateExpenseAccountDto.parse(req.body);
      const expenseAccount = await this.service.create(dto);
      return sendSuccess(res, expenseAccount, 'Expense account created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseAccounts = await this.service.getAll();
      return sendSuccess(res, expenseAccounts);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseAccount = await this.service.getById(req.params.id);
      return sendSuccess(res, expenseAccount);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateExpenseAccountDto.parse(req.body);
      const expenseAccount = await this.service.update(req.params.id, dto);
      return sendSuccess(res, expenseAccount, 'Expense account updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Expense account deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}


