import { Request, Response, NextFunction } from 'express';
import { OvertimePolicyService } from './overtime-policy.service';
import { CreateOvertimePolicyDto, UpdateOvertimePolicyDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class OvertimePolicyController {
  private service = new OvertimePolicyService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateOvertimePolicyDto.parse(req.body);
      const overtimePolicy = await this.service.create(dto);
      return sendSuccess(res, overtimePolicy, 'Overtime policy created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const overtimePolicies = await this.service.getAll();
      return sendSuccess(res, overtimePolicies);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const overtimePolicy = await this.service.getById(req.params.id);
      return sendSuccess(res, overtimePolicy);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateOvertimePolicyDto.parse(req.body);
      const overtimePolicy = await this.service.update(req.params.id, dto);
      return sendSuccess(res, overtimePolicy, 'Overtime policy updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Overtime policy deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

