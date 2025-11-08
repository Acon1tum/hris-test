import { Request, Response, NextFunction } from 'express';
import { ShiftService } from './shift.service';
import { CreateShiftDto, UpdateShiftDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class ShiftController {
  private service = new ShiftService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateShiftDto.parse(req.body);
      const shift = await this.service.create(dto);
      return sendSuccess(res, shift, 'Shift created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shifts = await this.service.getAll();
      return sendSuccess(res, shifts);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shift = await this.service.getById(req.params.id);
      return sendSuccess(res, shift);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateShiftDto.parse(req.body);
      const shift = await this.service.update(req.params.id, dto);
      return sendSuccess(res, shift, 'Shift updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Shift deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

