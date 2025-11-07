import type { 
  User, 
  UserRole, 
  Role, 
  RolePermission, 
  Permission, 
  RoleModule, 
  Module 
} from '@hris/database';
import type { Prisma } from '@hris/database';

// User with roles and permissions
export type UserWithRolesAndPermissions = Prisma.UserGetPayload<{
  include: {
    userRoles: {
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: true };
            };
            roleModules: {
              include: { module: true };
            };
          };
        };
      };
    };
  };
}>;

// UserRole with role and permissions
export type UserRoleWithRole = {
  role: {
    name: string;
    rolePermissions: Array<{
      permission: {
        slug: string;
      };
    }>;
    roleModules: Array<{
      canAccess: boolean;
      module: {
        slug: string;
        isActive: boolean;
      };
    }>;
  };
};

