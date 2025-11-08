import { apiClient } from '@/lib/api-client';

export type OrganizationFromAPI = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GraceTimeFromAPI = {
  id: string;
  organizationId: string;
  arrivalGraceEnabled: boolean;
  arrivalGraceTime: number;
  departureGraceEnabled: boolean;
  departureGraceTime: number;
  breakGraceEnabled: boolean;
  breakGraceTime: number;
  earlyLeaveGraceEnabled: boolean;
  earlyLeaveGraceTime: number;
  createdAt: string;
  updatedAt: string;
  organization: OrganizationFromAPI;
};

export interface CreateGraceTimeData {
  organizationId: string;
  arrivalGraceEnabled: boolean;
  arrivalGraceTime: number;
  departureGraceEnabled: boolean;
  departureGraceTime: number;
  breakGraceEnabled: boolean;
  breakGraceTime: number;
  earlyLeaveGraceEnabled: boolean;
  earlyLeaveGraceTime: number;
}

export interface UpdateGraceTimeData {
  arrivalGraceEnabled?: boolean;
  arrivalGraceTime?: number;
  departureGraceEnabled?: boolean;
  departureGraceTime?: number;
  breakGraceEnabled?: boolean;
  breakGraceTime?: number;
  earlyLeaveGraceEnabled?: boolean;
  earlyLeaveGraceTime?: number;
}

class GraceTimeService {
  async getAll(): Promise<GraceTimeFromAPI[]> {
    const response = await apiClient.get<GraceTimeFromAPI[]>('/grace-times');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch grace times');
    }
    return response.data;
  }

  async getById(id: string): Promise<GraceTimeFromAPI> {
    const response = await apiClient.get<GraceTimeFromAPI>(`/grace-times/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch grace time');
    }
    return response.data;
  }

  async getByOrganization(organizationId: string): Promise<GraceTimeFromAPI> {
    const response = await apiClient.get<GraceTimeFromAPI>(`/grace-times/organization/${organizationId}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch grace time');
    }
    return response.data;
  }

  async create(data: CreateGraceTimeData): Promise<GraceTimeFromAPI> {
    const response = await apiClient.post<GraceTimeFromAPI>('/grace-times', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create grace time');
    }
    return response.data;
  }

  async update(id: string, data: UpdateGraceTimeData): Promise<GraceTimeFromAPI> {
    const response = await apiClient.put<GraceTimeFromAPI>(`/grace-times/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update grace time');
    }
    return response.data;
  }

  async updateByOrganization(organizationId: string, data: UpdateGraceTimeData): Promise<GraceTimeFromAPI> {
    const response = await apiClient.put<GraceTimeFromAPI>(`/grace-times/organization/${organizationId}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update grace time');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/grace-times/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete grace time');
    }
    return response.data!;
  }
}

export const graceTimeService = new GraceTimeService();
