import { Request, Response, NextFunction } from 'express';
import { OfficeService } from './office.service';
import { CreateOfficeDto, UpdateOfficeDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class OfficeController {
  private service = new OfficeService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateOfficeDto.parse(req.body);
      const office = await this.service.create(dto);
      return sendSuccess(res, office, 'Office created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offices = await this.service.getAll();
      return sendSuccess(res, offices);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const office = await this.service.getById(req.params.id);
      return sendSuccess(res, office);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateOfficeDto.parse(req.body);
      const office = await this.service.update(req.params.id, dto);
      return sendSuccess(res, office, 'Office updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Office deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

