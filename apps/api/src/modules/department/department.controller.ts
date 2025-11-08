import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class DepartmentController {
  private service = new DepartmentService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateDepartmentDto.parse(req.body);
      const department = await this.service.create(dto);
      return sendSuccess(res, department, 'Department created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departments = await this.service.getAll();
      return sendSuccess(res, departments);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const department = await this.service.getById(req.params.id);
      return sendSuccess(res, department);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateDepartmentDto.parse(req.body);
      const department = await this.service.update(req.params.id, dto);
      return sendSuccess(res, department, 'Department updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Department deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}


