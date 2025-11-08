import { Request, Response, NextFunction } from 'express';
import { DesignationService } from './designation.service';
import { CreateDesignationDto, UpdateDesignationDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class DesignationController {
  private service = new DesignationService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateDesignationDto.parse(req.body);
      const designation = await this.service.create(dto);
      return sendSuccess(res, designation, 'Designation created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const designations = await this.service.getAll();
      return sendSuccess(res, designations);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const designation = await this.service.getById(req.params.id);
      return sendSuccess(res, designation);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateDesignationDto.parse(req.body);
      const designation = await this.service.update(req.params.id, dto);
      return sendSuccess(res, designation, 'Designation updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Designation deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}


