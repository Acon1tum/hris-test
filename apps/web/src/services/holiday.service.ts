import { apiClient } from '@/lib/api-client';

export type HolidayFromAPI = {
  id: string;
  name: string;
  date: string;
  year: number;
  description: string | null;
  isRecurring: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateHolidayData {
  name: string;
  date: string | Date;
  year: number;
  description?: string | null;
  isRecurring?: boolean;
  isActive?: boolean;
}

export interface UpdateHolidayData {
  name?: string;
  date?: string | Date;
  year?: number;
  description?: string | null;
  isRecurring?: boolean;
  isActive?: boolean;
}

class HolidayService {
  async getAll(): Promise<HolidayFromAPI[]> {
    const response = await apiClient.get<HolidayFromAPI[]>('/holidays');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch holidays');
    }
    return response.data;
  }

  async getById(id: string): Promise<HolidayFromAPI> {
    const response = await apiClient.get<HolidayFromAPI>(`/holidays/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch holiday');
    }
    return response.data;
  }

  async getByYear(year: number): Promise<HolidayFromAPI[]> {
    const response = await apiClient.get<HolidayFromAPI[]>(`/holidays/year/${year}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch holidays');
    }
    return response.data;
  }

  async create(data: CreateHolidayData): Promise<HolidayFromAPI> {
    const response = await apiClient.post<HolidayFromAPI>('/holidays', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create holiday');
    }
    return response.data;
  }

  async update(id: string, data: UpdateHolidayData): Promise<HolidayFromAPI> {
    const response = await apiClient.put<HolidayFromAPI>(`/holidays/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update holiday');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/holidays/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete holiday');
    }
    return response.data!;
  }
}

export const holidayService = new HolidayService();
