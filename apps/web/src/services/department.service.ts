import { apiClient } from '@/lib/api-client';

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  parentDepartmentId?: string | null;
  officeId?: string | null;
  departmentHeadId?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parentDepartment?: {
    id: string;
    name: string;
    code: string;
  } | null;
  office?: {
    id: string;
    name: string;
    city: string;
    province: string;
  } | null;
  departmentHead?: {
    id: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  } | null;
}

export interface CreateDepartmentData {
  name: string;
  code: string;
  description?: string | null;
  parentDepartmentId?: string | null;
  officeId?: string | null;
  departmentHeadId?: string | null;
  isActive?: boolean;
}

export interface UpdateDepartmentData {
  name?: string;
  code?: string;
  description?: string | null;
  parentDepartmentId?: string | null;
  officeId?: string | null;
  departmentHeadId?: string | null;
  isActive?: boolean;
}

class DepartmentService {
  async getAll(): Promise<Department[]> {
    const response = await apiClient.get<Department[]>('/departments');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch departments');
    }
    return response.data;
  }

  async getById(id: string): Promise<Department> {
    const response = await apiClient.get<Department>(`/departments/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch department');
    }
    return response.data;
  }

  async create(data: CreateDepartmentData): Promise<Department> {
    const response = await apiClient.post<Department>('/departments', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create department');
    }
    return response.data;
  }

  async update(id: string, data: UpdateDepartmentData): Promise<Department> {
    const response = await apiClient.put<Department>(`/departments/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update department');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/departments/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete department');
    }
    return response.data!;
  }
}

export const departmentService = new DepartmentService();

