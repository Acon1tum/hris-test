import { ApiError } from '../../utils/errors';
import { CreateRoleDto, AssignPermissionDto, CreatePermissionDto } from './dto';
import { roleRepository, permissionRepository, userRepository } from '../../repositories';

export class RbacService {
  // ==================== ROLES ====================
  
  async createRole(dto: CreateRoleDto) {
    const existing = await roleRepository.findByName(dto.name);

    if (existing) {
      throw new ApiError(400, 'Role with this name already exists');
    }

    const role = await roleRepository.create({
      name: dto.name,
      description: dto.description,
      priority: dto.priority || 0,
    });

    return role;
  }

  async getRoles(page = 1, pageSize = 10) {
    const { roles, total } = await roleRepository.findAllWithDetails(page, pageSize);

    return {
      roles,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async getRoleById(roleId: string) {
    const role = await roleRepository.findByIdWithDetails(roleId);

    if (!role) {
      throw new ApiError(404, 'Role not found');
    }

    return role;
  }

  async deleteRole(roleId: string) {
    const role = await roleRepository.findById(roleId);

    if (!role) {
      throw new ApiError(404, 'Role not found');
    }

    if (role.isSystem) {
      throw new ApiError(400, 'Cannot delete system role');
    }

    await roleRepository.delete(roleId);

    return { message: 'Role deleted successfully' };
  }

  // ==================== PERMISSIONS ====================

  async createPermission(dto: CreatePermissionDto) {
    const existing = await permissionRepository.findBySlug(dto.slug);

    if (existing) {
      throw new ApiError(400, 'Permission with this slug already exists');
    }

    const permission = await permissionRepository.create({
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      moduleId: dto.moduleId,
      resource: dto.resource,
      action: dto.action,
    });

    return permission;
  }

  async getPermissions(moduleId?: string) {
    if (moduleId) {
      return permissionRepository.findByModule(moduleId);
    }
    return permissionRepository.findAllWithModule();
  }

  async assignPermissionsToRole(dto: AssignPermissionDto) {
    const role = await roleRepository.findById(dto.roleId);

    if (!role) {
      throw new ApiError(404, 'Role not found');
    }

    // Remove existing permissions
    await roleRepository.deleteRolePermissions(dto.roleId);

    // Add new permissions
    if (dto.permissionIds.length > 0) {
      const result = await roleRepository.createRolePermissions(dto.roleId, dto.permissionIds);
      return { message: 'Permissions assigned successfully', count: result.count };
    }

    return { message: 'Permissions assigned successfully', count: 0 };
  }

  async assignModulesToRole(roleId: string, moduleIds: string[]) {
    const role = await roleRepository.findById(roleId);

    if (!role) {
      throw new ApiError(404, 'Role not found');
    }

    // Remove existing module access
    await roleRepository.deleteRoleModules(roleId);

    // Add new module access
    if (moduleIds.length > 0) {
      const result = await roleRepository.createRoleModules(roleId, moduleIds, true);
      return { message: 'Modules assigned successfully', count: result.count };
    }

    return { message: 'Modules assigned successfully', count: 0 };
  }

  // ==================== USER ROLE ASSIGNMENT ====================

  async assignRolesToUser(userId: string, roleIds: string[]) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Remove existing roles
    await userRepository.deleteUserRoles(userId);

    // Add new roles
    if (roleIds.length > 0) {
      const result = await userRepository.createUserRoles(userId, roleIds);
      return { message: 'Roles assigned successfully', count: result.count };
    }

    return { message: 'Roles assigned successfully', count: 0 };
  }

  async getUserPermissions(userId: string) {
    const userRoles = await userRepository.getUserRoles(userId);

    const permissions = new Set<string>();
    const modules = new Set<string>();

    userRoles.forEach((userRole) => {
      userRole.role.rolePermissions.forEach((rp) => {
        permissions.add(rp.permission.slug);
      });

      userRole.role.roleModules
        .filter((rm) => rm.module.isActive)
        .forEach((rm) => {
          modules.add(rm.module.slug);
        });
    });

    return {
      permissions: Array.from(permissions),
      modules: Array.from(modules),
    };
  }
}

