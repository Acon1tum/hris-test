import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { ApiError } from '../utils/errors';
import { moduleRepository, userRepository } from '../repositories';

export const requireModuleAccess = (moduleSlug: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return next(new ApiError(401, 'Authentication required'));
      }

      // Check if module exists and is active
      const module = await moduleRepository.findBySlug(moduleSlug);

      if (!module || !module.isActive) {
        return next(new ApiError(404, 'Module not found or inactive'));
      }

      // Get user's roles with module access
      const userRoles = await userRepository.getUserRoles(req.user.id);

      // Check if any of the user's roles have access to this module
      const hasAccess = userRoles.some((userRole) =>
        userRole.role.roleModules.some((rm) => rm.canAccess && rm.moduleId === module.id)
      );

      if (!hasAccess) {
        return next(
          new ApiError(403, `Access denied to ${module.name} module`)
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

