import { Request, Response, NextFunction } from 'express';
import { EmployerTaxableComponentService } from './employer-taxable-component.service';
import { CreateEmployerTaxableComponentDto, UpdateEmployerTaxableComponentDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class EmployerTaxableComponentController {
  private service = new EmployerTaxableComponentService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateEmployerTaxableComponentDto.parse(req.body);
      const component = await this.service.create(dto);
      return sendSuccess(res, component, 'Employer taxable component created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const components = await this.service.getAll();
      return sendSuccess(res, components);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const component = await this.service.getById(req.params.id);
      return sendSuccess(res, component);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateEmployerTaxableComponentDto.parse(req.body);
      const component = await this.service.update(req.params.id, dto);
      return sendSuccess(res, component, 'Employer taxable component updated successfully');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };
}

