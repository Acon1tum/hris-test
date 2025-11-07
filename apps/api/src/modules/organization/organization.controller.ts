import { Request, Response, NextFunction } from 'express';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class OrganizationController {
  private service = new OrganizationService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateOrganizationDto.parse(req.body);
      const organization = await this.service.create(dto);
      return sendSuccess(res, organization, 'Organization created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizations = await this.service.getAll();
      return sendSuccess(res, organizations);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organization = await this.service.getById(req.params.id);
      return sendSuccess(res, organization);
    } catch (error) {
      next(error);
    }
  };

  getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organization = await this.service.getBySlug(req.params.slug);
      return sendSuccess(res, organization);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = UpdateOrganizationDto.parse(req.body);
      const organization = await this.service.update(req.params.id, dto);
      return sendSuccess(res, organization, 'Organization updated successfully');
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

