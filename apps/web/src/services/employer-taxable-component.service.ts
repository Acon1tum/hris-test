import { apiClient } from '@/lib/api-client';

export type EmployerTaxableComponentFromAPI = {
  id: string;
  name: string;
  code: string;
  type: string;
  description: string | null;
  rateType: string;
  rate: number | string;
  account: string | null;
  entryType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateEmployerTaxableComponentData = {
  name: string;
  code: string;
  type: string;
  description?: string | null;
  rateType: string;
  rate: number;
  account?: string | null;
  entryType: string;
  isActive?: boolean;
};

export type UpdateEmployerTaxableComponentData = Partial<CreateEmployerTaxableComponentData>;

class EmployerTaxableComponentService {
  async getAll(): Promise<EmployerTaxableComponentFromAPI[]> {
    const response = await apiClient.get<EmployerTaxableComponentFromAPI[]>('/employer-taxable-components');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch employer taxable components');
    }
    return response.data;
  }

  async getById(id: string): Promise<EmployerTaxableComponentFromAPI> {
    const response = await apiClient.get<EmployerTaxableComponentFromAPI>(`/employer-taxable-components/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || `Failed to fetch employer taxable component with ID ${id}`);
    }
    return response.data;
  }

  async create(data: CreateEmployerTaxableComponentData): Promise<EmployerTaxableComponentFromAPI> {
    const response = await apiClient.post<EmployerTaxableComponentFromAPI>('/employer-taxable-components', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create employer taxable component');
    }
    return response.data;
  }

  async update(id: string, data: UpdateEmployerTaxableComponentData): Promise<EmployerTaxableComponentFromAPI> {
    const response = await apiClient.put<EmployerTaxableComponentFromAPI>(`/employer-taxable-components/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || `Failed to update employer taxable component with ID ${id}`);
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/employer-taxable-components/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || `Failed to delete employer taxable component with ID ${id}`);
    }
    return response.data;
  }
}

export const employerTaxableComponentService = new EmployerTaxableComponentService();

