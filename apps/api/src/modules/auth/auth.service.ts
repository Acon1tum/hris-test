import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ApiError } from '../../utils/errors';
import { LoginDto, RegisterDto } from './dto';
import { userRepository, roleRepository } from '../../repositories';

export class AuthService {
  async login(dto: LoginDto) {
    const user = await userRepository.findByEmail(dto.email, true);

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    if (!user.isActive) {
      throw new ApiError(401, 'Account is inactive');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Update last login
    await userRepository.updateLastLogin(user.id);

    // Generate tokens
    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    // Extract permissions and modules
    const permissions = new Set<string>();
    const modules = new Set<string>();
    const roles: string[] = [];

    // Type guard to ensure user has userRoles
    if ('userRoles' in user && user.userRoles) {
      user.userRoles.forEach((userRole) => {
        roles.push(userRole.role.name);
        
        userRole.role.rolePermissions.forEach((rp) => {
          permissions.add(rp.permission.slug);
        });

        userRole.role.roleModules
          .filter((rm) => rm.canAccess && rm.module.isActive)
          .forEach((rm) => {
            modules.add(rm.module.slug);
          });
      });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
        permissions: Array.from(permissions),
        modules: Array.from(modules),
      },
      accessToken,
      refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    const existingUser = await userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ApiError(400, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await userRepository.create({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    // Assign default role (e.g., Employee)
    const defaultRole = await roleRepository.findByName('Employee');

    if (defaultRole) {
      await userRepository.createUserRole(user.id, defaultRole.id);
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  private generateAccessToken(userId: string): string {
    const expiresIn = process.env.JWT_EXPIRES_IN ?? '2h';
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: expiresIn as string,
    } as SignOptions);
  }

  private generateRefreshToken(userId: string): string {
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN ?? '7d';
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: expiresIn as string,
    } as SignOptions);
  }

  async getUserWithPermissions(userId: string) {
    const user = await userRepository.findByIdWithRolesAndPermissions(userId);

    if (!user || !user.isActive) {
      return null;
    }

    const permissions = new Set<string>();
    const modules = new Set<string>();
    const roles: string[] = [];

    if (user.userRoles) {
      user.userRoles.forEach((userRole) => {
        roles.push(userRole.role.name);
        userRole.role.rolePermissions.forEach((rp) => {
          permissions.add(rp.permission.slug);
        });

        userRole.role.roleModules
          .filter((rm) => rm.canAccess && rm.module.isActive)
          .forEach((rm) => {
            modules.add(rm.module.slug);
          });
      });
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles,
      permissions: Array.from(permissions),
      modules: Array.from(modules),
    };
  }
}

