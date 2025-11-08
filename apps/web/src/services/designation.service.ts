import { apiClient } from '@/lib/api-client';

export type DesignationFromAPI = {
  id: string;
  title: string;
  code: string;
  description: string | null;
  level: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateDesignationData {
  title: string;
  code: string;
  description?: string | null;
  level: number;
  isActive?: boolean;
}

export interface UpdateDesignationData {
  title?: string;
  code?: string;
  description?: string | null;
  level?: number;
  isActive?: boolean;
}

class DesignationService {
  async getAll(): Promise<DesignationFromAPI[]> {
    const response = await apiClient.get<DesignationFromAPI[]>('/designations');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch designations');
    }
    return response.data;
  }

  async getById(id: string): Promise<DesignationFromAPI> {
    const response = await apiClient.get<DesignationFromAPI>(`/designations/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch designation');
    }
    return response.data;
  }

  async create(data: CreateDesignationData): Promise<DesignationFromAPI> {
    const response = await apiClient.post<DesignationFromAPI>('/designations', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create designation');
    }
    return response.data;
  }

  async update(id: string, data: UpdateDesignationData): Promise<DesignationFromAPI> {
    const response = await apiClient.put<DesignationFromAPI>(`/designations/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update designation');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/designations/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete designation');
    }
    return response.data!;
  }
}

export const designationService = new DesignationService();

