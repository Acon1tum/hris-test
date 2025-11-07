import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/errors';
import { AuthService } from '../modules/auth/auth.service';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    permissions: string[];
    modules: string[];
  };
}

const authService = new AuthService();

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    interface JwtPayload {
      userId: string;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Fetch user with roles and permissions using service
    const user = await authService.getUserWithPermissions(decoded.userId);

    if (!user) {
      throw new ApiError(401, 'Invalid or inactive user');
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

