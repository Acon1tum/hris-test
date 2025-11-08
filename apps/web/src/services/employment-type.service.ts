import { apiClient } from '@/lib/api-client';

export type EmploymentTypeFromAPI = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateEmploymentTypeData {
  name: string;
  code: string;
  description?: string | null;
  isActive?: boolean;
}

export interface UpdateEmploymentTypeData {
  name?: string;
  code?: string;
  description?: string | null;
  isActive?: boolean;
}

class EmploymentTypeService {
  async getAll(): Promise<EmploymentTypeFromAPI[]> {
    const response = await apiClient.get<EmploymentTypeFromAPI[]>('/employment-types');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch employment types');
    }
    return response.data;
  }

  async getById(id: string): Promise<EmploymentTypeFromAPI> {
    const response = await apiClient.get<EmploymentTypeFromAPI>(`/employment-types/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch employment type');
    }
    return response.data;
  }

  async create(data: CreateEmploymentTypeData): Promise<EmploymentTypeFromAPI> {
    const response = await apiClient.post<EmploymentTypeFromAPI>('/employment-types', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create employment type');
    }
    return response.data;
  }

  async update(id: string, data: UpdateEmploymentTypeData): Promise<EmploymentTypeFromAPI> {
    const response = await apiClient.put<EmploymentTypeFromAPI>(`/employment-types/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update employment type');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/employment-types/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete employment type');
    }
    return response.data!;
  }
}

export const employmentTypeService = new EmploymentTypeService();

