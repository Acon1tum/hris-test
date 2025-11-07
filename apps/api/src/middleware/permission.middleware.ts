import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { ApiError } from '../utils/errors';

export const requirePermission = (...requiredPermissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    const hasPermission = requiredPermissions.some((permission) =>
      req.user!.permissions.includes(permission)
    );

    if (!hasPermission) {
      return next(
        new ApiError(
          403,
          `Missing required permissions: ${requiredPermissions.join(', ')}`
        )
      );
    }

    next();
  };
};

export const requireAnyPermission = (...permissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    const hasAnyPermission = permissions.some((permission) =>
      req.user!.permissions.includes(permission)
    );

    if (!hasAnyPermission) {
      return next(new ApiError(403, 'Insufficient permissions'));
    }

    next();
  };
};

export const requireAllPermissions = (...permissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    const hasAllPermissions = permissions.every((permission) =>
      req.user!.permissions.includes(permission)
    );

    if (!hasAllPermissions) {
      return next(new ApiError(403, 'Insufficient permissions'));
    }

    next();
  };
};

