import { apiClient } from '@/lib/api-client';

export type OvertimePolicyFromAPI = {
  id: string;
  name: string;
  description: string | null;
  overtimePayComponent: string | null;
  regularHoursPerDay: number;
  regularHoursPerWeek: number;
  weekdayOvertimeMultiplier: number | string;
  weekendMultiplier: number | string;
  holidayMultiplier: number | string;
  maxDailyOvertimeHours: number | null;
  maxWeeklyOvertimeHours: number | null;
  maxMonthlyOvertimeHours: number | null;
  calculateBasedOn: string;
  applicableAfterWorkingDays: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateOvertimePolicyData {
  name: string;
  description?: string | null;
  overtimePayComponent?: string | null;
  regularHoursPerDay: number;
  regularHoursPerWeek: number;
  weekdayOvertimeMultiplier: number;
  weekendMultiplier: number;
  holidayMultiplier: number;
  maxDailyOvertimeHours?: number | null;
  maxWeeklyOvertimeHours?: number | null;
  maxMonthlyOvertimeHours?: number | null;
  calculateBasedOn: string;
  applicableAfterWorkingDays?: number | null;
  isActive?: boolean;
}

export interface UpdateOvertimePolicyData {
  name?: string;
  description?: string | null;
  overtimePayComponent?: string | null;
  regularHoursPerDay?: number;
  regularHoursPerWeek?: number;
  weekdayOvertimeMultiplier?: number;
  weekendMultiplier?: number;
  holidayMultiplier?: number;
  maxDailyOvertimeHours?: number | null;
  maxWeeklyOvertimeHours?: number | null;
  maxMonthlyOvertimeHours?: number | null;
  calculateBasedOn?: string;
  applicableAfterWorkingDays?: number | null;
  isActive?: boolean;
}

class OvertimePolicyService {
  async getAll(): Promise<OvertimePolicyFromAPI[]> {
    const response = await apiClient.get<OvertimePolicyFromAPI[]>('/overtime-policies');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch overtime policies');
    }
    return response.data;
  }

  async getById(id: string): Promise<OvertimePolicyFromAPI> {
    const response = await apiClient.get<OvertimePolicyFromAPI>(`/overtime-policies/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch overtime policy');
    }
    return response.data;
  }

  async create(data: CreateOvertimePolicyData): Promise<OvertimePolicyFromAPI> {
    const response = await apiClient.post<OvertimePolicyFromAPI>('/overtime-policies', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create overtime policy');
    }
    return response.data;
  }

  async update(id: string, data: UpdateOvertimePolicyData): Promise<OvertimePolicyFromAPI> {
    const response = await apiClient.put<OvertimePolicyFromAPI>(`/overtime-policies/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update overtime policy');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/overtime-policies/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete overtime policy');
    }
    return response.data!;
  }
}

export const overtimePolicyService = new OvertimePolicyService();
