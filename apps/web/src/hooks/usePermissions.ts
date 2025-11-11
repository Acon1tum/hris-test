import { useQuery } from '@tanstack/react-query';
import { permissionService, PermissionFromAPI } from '@/services/permission.service';

const PERMISSION_QUERY_KEY = 'permissions';

export function usePermissions(moduleId?: string) {
  return useQuery<PermissionFromAPI[]>({
    queryKey: [PERMISSION_QUERY_KEY, moduleId],
    queryFn: () => permissionService.getAll(moduleId),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Helper function to group permissions by module/resource
export function groupPermissionsByModule(permissions: PermissionFromAPI[]) {
  const grouped: Record<string, PermissionFromAPI[]> = {};
  
  permissions.forEach((permission) => {
    const key = permission.module.name;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(permission);
  });
  
  return grouped;
}

// Helper function to group permissions by resource within modules
export function groupPermissionsByResource(permissions: PermissionFromAPI[]) {
  const grouped: Record<string, Record<string, PermissionFromAPI[]>> = {};
  
  permissions.forEach((permission) => {
    const moduleKey = permission.module.name;
    const resourceKey = permission.resource;
    
    if (!grouped[moduleKey]) {
      grouped[moduleKey] = {};
    }
    if (!grouped[moduleKey][resourceKey]) {
      grouped[moduleKey][resourceKey] = [];
    }
    grouped[moduleKey][resourceKey].push(permission);
  });
  
  return grouped;
}

