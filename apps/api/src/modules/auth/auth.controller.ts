import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { sendSuccess } from '../../utils/response';
import { AuthRequest } from '../../middleware/auth.middleware';

export class AuthController {
  private service = new AuthService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = LoginDto.parse(req.body);
      const result = await this.service.login(dto);
      return sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = RegisterDto.parse(req.body);
      const result = await this.service.register(dto);
      return sendSuccess(res, result, 'Registration successful', 201);
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // This will be handled by auth middleware
      const authReq = req as AuthRequest;
      return sendSuccess(res, authReq.user, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  };
}

