import { Request, Response, NextFunction } from 'express';
import { LeavePolicyService } from './leave-policy.service';
import { CreateLeavePolicyDto, UpdateLeavePolicyDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class LeavePolicyController {
  private service = new LeavePolicyService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateLeavePolicyDto.parse(req.body);
      const leavePolicy = await this.service.create(dto);
      return sendSuccess(res, leavePolicy, 'Leave policy created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leavePolicies = await this.service.getAll();
      return sendSuccess(res, leavePolicies);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leavePolicy = await this.service.getById(req.params.id);
      return sendSuccess(res, leavePolicy);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateLeavePolicyDto.parse(req.body);
      const leavePolicy = await this.service.update(req.params.id, dto);
      return sendSuccess(res, leavePolicy, 'Leave policy updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Leave policy deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

