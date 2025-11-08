import { Request, Response, NextFunction } from 'express';
import { GradeService } from './grade.service';
import { CreateGradeDto, UpdateGradeDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class GradeController {
  private service = new GradeService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateGradeDto.parse(req.body);
      const grade = await this.service.create(dto);
      return sendSuccess(res, grade, 'Grade created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const grades = await this.service.getAll();
      return sendSuccess(res, grades);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const grade = await this.service.getById(req.params.id);
      return sendSuccess(res, grade);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateGradeDto.parse(req.body);
      const grade = await this.service.update(req.params.id, dto);
      return sendSuccess(res, grade, 'Grade updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Grade deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}


