import { Request, Response, NextFunction } from 'express';
import { PayrollConfigService } from './payroll-config.service';
import { CreatePayrollConfigDto, UpdatePayrollConfigDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class PayrollConfigController {
  private service = new PayrollConfigService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreatePayrollConfigDto.parse(req.body);
      const payrollConfig = await this.service.create(dto);
      return sendSuccess(res, payrollConfig, 'Payroll config created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payrollConfigs = await this.service.getAll();
      return sendSuccess(res, payrollConfigs);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payrollConfig = await this.service.getById(req.params.id);
      return sendSuccess(res, payrollConfig);
    } catch (error) {
      next(error);
    }
  };

  getByOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payrollConfigs = await this.service.getByOrganization(req.params.organizationId);
      return sendSuccess(res, payrollConfigs);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdatePayrollConfigDto.parse(req.body);
      const payrollConfig = await this.service.update(req.params.id, dto);
      return sendSuccess(res, payrollConfig, 'Payroll config updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Payroll config deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}


