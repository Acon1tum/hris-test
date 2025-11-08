import { apiClient } from '@/lib/api-client';

export type LeaveTypeFromAPI = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  daysPerYear: number;
  applicableAfter: number | null;
  maxConsecutiveLeaves: number | null;
  earnedLeaveFrequency: string | null;
  allocateOnDay: string | null;
  nonEncashableLeaves: number | null;
  fractionOfDailySalary: number | null;
  maxEncashableLeaves: number | null;
  maxCarryForward: number;
  isEarnedLeave: boolean;
  isPartiallyPaidLeave: boolean;
  allowOverAllocation: boolean;
  isEncashmentAllowed: boolean;
  isCarryForward: boolean;
  isOptionalLeave: boolean;
  includeHolidaysWithinLeaves: boolean;
  isLeaveWithoutPay: boolean;
  allowNegativeBalance: boolean;
  isCompensatory: boolean;
  isIncrementalLeave: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateLeaveTypeData {
  name: string;
  code: string;
  description?: string | null;
  daysPerYear: number;
  requiresApproval?: boolean;
  isActive?: boolean;
  applicableAfter?: number | null;
  maxConsecutiveLeaves?: number | null;
  earnedLeaveFrequency?: string | null;
  allocateOnDay?: string | null;
  nonEncashableLeaves?: number | null;
  fractionOfDailySalary?: number | null;
  maxEncashableLeaves?: number | null;
  maxCarryForward?: number;
  isEarnedLeave?: boolean;
  isPartiallyPaidLeave?: boolean;
  allowOverAllocation?: boolean;
  isEncashmentAllowed?: boolean;
  isCarryForward?: boolean;
  isOptionalLeave?: boolean;
  includeHolidaysWithinLeaves?: boolean;
  isLeaveWithoutPay?: boolean;
  allowNegativeBalance?: boolean;
  isCompensatory?: boolean;
  isIncrementalLeave?: boolean;
}

export interface UpdateLeaveTypeData {
  name?: string;
  code?: string;
  description?: string | null;
  daysPerYear?: number;
  requiresApproval?: boolean;
  isActive?: boolean;
  applicableAfter?: number | null;
  maxConsecutiveLeaves?: number | null;
  earnedLeaveFrequency?: string | null;
  allocateOnDay?: string | null;
  nonEncashableLeaves?: number | null;
  fractionOfDailySalary?: number | null;
  maxEncashableLeaves?: number | null;
  maxCarryForward?: number;
  isEarnedLeave?: boolean;
  isPartiallyPaidLeave?: boolean;
  allowOverAllocation?: boolean;
  isEncashmentAllowed?: boolean;
  isCarryForward?: boolean;
  isOptionalLeave?: boolean;
  includeHolidaysWithinLeaves?: boolean;
  isLeaveWithoutPay?: boolean;
  allowNegativeBalance?: boolean;
  isCompensatory?: boolean;
  isIncrementalLeave?: boolean;
}

class LeaveTypeService {
  async getAll(): Promise<LeaveTypeFromAPI[]> {
    const response = await apiClient.get<LeaveTypeFromAPI[]>('/leave-types');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch leave types');
    }
    return response.data;
  }

  async getById(id: string): Promise<LeaveTypeFromAPI> {
    const response = await apiClient.get<LeaveTypeFromAPI>(`/leave-types/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch leave type');
    }
    return response.data;
  }

  async create(data: CreateLeaveTypeData): Promise<LeaveTypeFromAPI> {
    const response = await apiClient.post<LeaveTypeFromAPI>('/leave-types', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create leave type');
    }
    return response.data;
  }

  async update(id: string, data: UpdateLeaveTypeData): Promise<LeaveTypeFromAPI> {
    const response = await apiClient.put<LeaveTypeFromAPI>(`/leave-types/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update leave type');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/leave-types/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete leave type');
    }
    return response.data!;
  }
}

export const leaveTypeService = new LeaveTypeService();
