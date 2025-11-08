import { Request, Response, NextFunction } from 'express';
import { HolidayService } from './holiday.service';
import { CreateHolidayDto, UpdateHolidayDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class HolidayController {
  private service = new HolidayService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateHolidayDto.parse(req.body);
      const holiday = await this.service.create(dto);
      return sendSuccess(res, holiday, 'Holiday created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const holidays = await this.service.getAll();
      return sendSuccess(res, holidays);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const holiday = await this.service.getById(req.params.id);
      return sendSuccess(res, holiday);
    } catch (error) {
      next(error);
    }
  };

  getByYear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const year = parseInt(req.params.year);
      if (isNaN(year)) {
        return res.status(400).json({ success: false, error: 'Invalid year' });
      }
      const holidays = await this.service.getByYear(year);
      return sendSuccess(res, holidays);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateHolidayDto.parse(req.body);
      const holiday = await this.service.update(req.params.id, dto);
      return sendSuccess(res, holiday, 'Holiday updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result, 'Holiday deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}


