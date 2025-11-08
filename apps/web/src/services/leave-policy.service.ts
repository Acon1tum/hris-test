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

export type LeaveTypeFromAPI = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  daysPerYear: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LeavePolicyFromAPI = {
  id: string;
  name: string;
  description: string | null;
  employmentTypeId: string | null;
  leaveTypeId: string | null;
  numberOfDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  employmentType?: EmploymentTypeFromAPI | null;
  leaveType?: LeaveTypeFromAPI | null;
};

export interface CreateLeavePolicyData {
  name: string;
  description?: string | null;
  employmentTypeId?: string | null;
  leaveTypeId?: string | null;
  numberOfDays: number;
  isActive?: boolean;
}

export interface UpdateLeavePolicyData {
  name?: string;
  description?: string | null;
  employmentTypeId?: string | null;
  leaveTypeId?: string | null;
  numberOfDays?: number;
  isActive?: boolean;
}

class LeavePolicyService {
  async getAll(): Promise<LeavePolicyFromAPI[]> {
    const response = await apiClient.get<LeavePolicyFromAPI[]>('/leave-policies');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch leave policies');
    }
    return response.data;
  }

  async getById(id: string): Promise<LeavePolicyFromAPI> {
    const response = await apiClient.get<LeavePolicyFromAPI>(`/leave-policies/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch leave policy');
    }
    return response.data;
  }

  async create(data: CreateLeavePolicyData): Promise<LeavePolicyFromAPI> {
    const response = await apiClient.post<LeavePolicyFromAPI>('/leave-policies', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create leave policy');
    }
    return response.data;
  }

  async update(id: string, data: UpdateLeavePolicyData): Promise<LeavePolicyFromAPI> {
    const response = await apiClient.put<LeavePolicyFromAPI>(`/leave-policies/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update leave policy');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/leave-policies/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete leave policy');
    }
    return response.data!;
  }
}

export const leavePolicyService = new LeavePolicyService();
