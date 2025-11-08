import { Request, Response, NextFunction } from 'express';
import { GraceTimeService } from './grace-time.service';
import { CreateGraceTimeDto, UpdateGraceTimeDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class GraceTimeController {
  private service = new GraceTimeService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateGraceTimeDto.parse(req.body);
      const graceTime = await this.service.create(dto);
      return sendSuccess(res, graceTime, 'Grace time configuration created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const graceTimes = await this.service.getAll();
      return sendSuccess(res, graceTimes);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const graceTime = await this.service.getById(req.params.id);
      return sendSuccess(res, graceTime);
    } catch (error) {
      next(error);
    }
  };

  getByOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const graceTime = await this.service.getByOrganization(req.params.organizationId);
      return sendSuccess(res, graceTime);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateGraceTimeDto.parse(req.body);
      const graceTime = await this.service.update(req.params.id, dto);
      return sendSuccess(res, graceTime, 'Grace time configuration updated successfully');
    } catch (error) {
      next(error);
    }
  };

  updateByOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateGraceTimeDto.parse(req.body);
      const graceTime = await this.service.updateByOrganization(req.params.organizationId, dto);
      return sendSuccess(res, graceTime, 'Grace time configuration updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Grace time configuration deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}


