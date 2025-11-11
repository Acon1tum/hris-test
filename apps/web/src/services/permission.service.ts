import { apiClient } from '@/lib/api-client';

export interface PermissionFromAPI {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  moduleId: string;
  resource: string;
  action: string;
  module: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    order: number;
  };
  createdAt: string;
  updatedAt: string;
}

class PermissionService {
  async getAll(moduleId?: string): Promise<PermissionFromAPI[]> {
    const url = moduleId ? `/rbac/permissions?moduleId=${moduleId}` : '/rbac/permissions';
    const response = await apiClient.get<PermissionFromAPI[]>(url);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch permissions');
    }
    return response.data;
  }
}

export const permissionService = new PermissionService();

