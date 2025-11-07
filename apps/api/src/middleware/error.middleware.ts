import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/errors';
import { logger } from '../utils/logger';
import { sendError } from '../utils/response';

export function errorMiddleware(
  err: Error | ApiError | ZodError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    logger.error('Validation error:', err.errors);
    const errors: Record<string, string[]> = {};
    err.errors.forEach((error) => {
      const path = error.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(error.message);
    });
    return sendError(res, 'Validation failed', 400, errors);
  }

  // Handle API errors
  if (err instanceof ApiError) {
    logger.error(`API Error: ${err.statusCode} - ${err.message}`);
    return sendError(res, err.message, err.statusCode);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    logger.error('JWT error:', err.message);
    return sendError(res, 'Invalid or expired token', 401);
  }

  logger.error('Unhandled error:', err);
  return sendError(res, 'Internal server error', 500);
}

