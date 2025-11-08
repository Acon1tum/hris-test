import { apiClient } from '@/lib/api-client';

export type GradeFromAPI = {
  id: string;
  name: string;
  code: string;
  level: number;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateGradeData {
  name: string;
  code: string;
  level: number;
  description?: string | null;
  isActive?: boolean;
}

export interface UpdateGradeData {
  name?: string;
  code?: string;
  level?: number;
  description?: string | null;
  isActive?: boolean;
}

class GradeService {
  async getAll(): Promise<GradeFromAPI[]> {
    const response = await apiClient.get<GradeFromAPI[]>('/grades');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch grades');
    }
    return response.data;
  }

  async getById(id: string): Promise<GradeFromAPI> {
    const response = await apiClient.get<GradeFromAPI>(`/grades/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch grade');
    }
    return response.data;
  }

  async create(data: CreateGradeData): Promise<GradeFromAPI> {
    const response = await apiClient.post<GradeFromAPI>('/grades', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create grade');
    }
    return response.data;
  }

  async update(id: string, data: UpdateGradeData): Promise<GradeFromAPI> {
    const response = await apiClient.put<GradeFromAPI>(`/grades/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update grade');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/grades/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete grade');
    }
    return response.data!;
  }
}

export const gradeService = new GradeService();

