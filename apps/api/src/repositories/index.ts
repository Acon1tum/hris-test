import { prisma } from '@hris/database';
import { UserRepository } from './user.repository';
import { RoleRepository } from './role.repository';
import { PermissionRepository } from './permission.repository';
import { ModuleRepository } from './module.repository';

// Create singleton instances
export const userRepository = new UserRepository(prisma);
export const roleRepository = new RoleRepository(prisma);
export const permissionRepository = new PermissionRepository(prisma);
export const moduleRepository = new ModuleRepository(prisma);

// Export repositories for dependency injection if needed
export { UserRepository, RoleRepository, PermissionRepository, ModuleRepository };

