import { Request, Response, NextFunction } from 'express';
import { RbacService } from './rbac.service';
import { CreateRoleDto, AssignPermissionDto, CreatePermissionDto } from './dto';
import { sendSuccess } from '../../utils/response';

export class RbacController {
  private service = new RbacService();

  // Roles
  createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateRoleDto.parse(req.body);
      const role = await this.service.createRole(dto);
      return sendSuccess(res, role, 'Role created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const result = await this.service.getRoles(page, pageSize);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = await this.service.getRoleById(req.params.id);
      return sendSuccess(res, role);
    } catch (error) {
      next(error);
    }
  };

  deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.deleteRole(req.params.id);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  // Permissions
  createPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreatePermissionDto.parse(req.body);
      const permission = await this.service.createPermission(dto);
      return sendSuccess(res, permission, 'Permission created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const moduleId = req.query.moduleId as string;
      const permissions = await this.service.getPermissions(moduleId);
      return sendSuccess(res, permissions);
    } catch (error) {
      next(error);
    }
  };

  assignPermissionsToRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = AssignPermissionDto.parse({ ...req.body, roleId: req.params.roleId });
      const result = await this.service.assignPermissionsToRole(dto);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  assignModulesToRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { moduleIds } = req.body;
      const result = await this.service.assignModulesToRole(req.params.roleId, moduleIds);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  assignRolesToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roleIds } = req.body;
      const result = await this.service.assignRolesToUser(req.params.userId, roleIds);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getUserPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getUserPermissions(req.params.userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };
}

