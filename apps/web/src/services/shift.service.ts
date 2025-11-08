import { apiClient } from '@/lib/api-client';

export type ShiftFromAPI = {
  id: string;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  days: string | null;
  breakDuration: number | string | null;
  overtimeMultiplier: number | string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateShiftData {
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  days?: string | null;
  breakDuration?: number | null;
  overtimeMultiplier?: number | null;
  isActive?: boolean;
}

export interface UpdateShiftData {
  name?: string;
  code?: string;
  startTime?: string;
  endTime?: string;
  days?: string | null;
  breakDuration?: number | null;
  overtimeMultiplier?: number | null;
  isActive?: boolean;
}

class ShiftService {
  async getAll(): Promise<ShiftFromAPI[]> {
    const response = await apiClient.get<ShiftFromAPI[]>('/shifts');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch shifts');
    }
    return response.data;
  }

  async getById(id: string): Promise<ShiftFromAPI> {
    const response = await apiClient.get<ShiftFromAPI>(`/shifts/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch shift');
    }
    return response.data;
  }

  async create(data: CreateShiftData): Promise<ShiftFromAPI> {
    const response = await apiClient.post<ShiftFromAPI>('/shifts', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create shift');
    }
    return response.data;
  }

  async update(id: string, data: UpdateShiftData): Promise<ShiftFromAPI> {
    const response = await apiClient.put<ShiftFromAPI>(`/shifts/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update shift');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/shifts/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete shift');
    }
    return response.data!;
  }
}

export const shiftService = new ShiftService();
