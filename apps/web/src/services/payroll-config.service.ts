import { apiClient } from '@/lib/api-client';

export type OrganizationFromAPI = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PayrollConfigFromAPI = {
  id: string;
  payrollFrequency: string;
  automatedPayroll: boolean;
  organizationId: string | null;
  createdAt: string;
  updatedAt: string;
  organization?: OrganizationFromAPI | null;
};

export interface CreatePayrollConfigData {
  payrollFrequency: string;
  automatedPayroll: boolean;
  organizationId?: string | null;
}

export interface UpdatePayrollConfigData {
  payrollFrequency?: string;
  automatedPayroll?: boolean;
  organizationId?: string | null;
}

class PayrollConfigService {
  async getAll(): Promise<PayrollConfigFromAPI[]> {
    const response = await apiClient.get<PayrollConfigFromAPI[]>('/payroll-configs');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch payroll configs');
    }
    return response.data;
  }

  async getById(id: string): Promise<PayrollConfigFromAPI> {
    const response = await apiClient.get<PayrollConfigFromAPI>(`/payroll-configs/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch payroll config');
    }
    return response.data;
  }

  async getByOrganization(organizationId: string): Promise<PayrollConfigFromAPI[]> {
    const response = await apiClient.get<PayrollConfigFromAPI[]>(`/payroll-configs/organization/${organizationId}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch payroll configs');
    }
    return response.data;
  }

  async create(data: CreatePayrollConfigData): Promise<PayrollConfigFromAPI> {
    const response = await apiClient.post<PayrollConfigFromAPI>('/payroll-configs', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create payroll config');
    }
    return response.data;
  }

  async update(id: string, data: UpdatePayrollConfigData): Promise<PayrollConfigFromAPI> {
    const response = await apiClient.put<PayrollConfigFromAPI>(`/payroll-configs/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update payroll config');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/payroll-configs/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete payroll config');
    }
    return response.data!;
  }
}

export const payrollConfigService = new PayrollConfigService();
