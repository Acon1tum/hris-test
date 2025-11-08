import { Request, Response, NextFunction } from 'express';
import { LeaveTypeService } from './leave-type.service';
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class LeaveTypeController {
  private service = new LeaveTypeService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateLeaveTypeDto.parse(req.body);
      const leaveType = await this.service.create(dto);
      return sendSuccess(res, leaveType, 'Leave type created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaveTypes = await this.service.getAll();
      return sendSuccess(res, leaveTypes);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaveType = await this.service.getById(req.params.id);
      return sendSuccess(res, leaveType);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateLeaveTypeDto.parse(req.body);
      const leaveType = await this.service.update(req.params.id, dto);
      return sendSuccess(res, leaveType, 'Leave type updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Leave type deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

