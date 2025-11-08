import { Request, Response, NextFunction } from 'express';
import { EmploymentTypeService } from './employment-type.service';
import { CreateEmploymentTypeDto, UpdateEmploymentTypeDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class EmploymentTypeController {
  private service = new EmploymentTypeService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateEmploymentTypeDto.parse(req.body);
      const employmentType = await this.service.create(dto);
      return sendSuccess(res, employmentType, 'Employment type created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employmentTypes = await this.service.getAll();
      return sendSuccess(res, employmentTypes);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employmentType = await this.service.getById(req.params.id);
      return sendSuccess(res, employmentType);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateEmploymentTypeDto.parse(req.body);
      const employmentType = await this.service.update(req.params.id, dto);
      return sendSuccess(res, employmentType, 'Employment type updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Employment type deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

