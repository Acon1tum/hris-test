import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@hris/shared-types';

export interface OfficePhone {
  id?: string;
  countryCode: string;
  number: string;
  type?: string | null;
  isPrimary?: boolean;
}

export interface OfficeEmail {
  id?: string;
  email: string;
  type?: string | null;
  isPrimary?: boolean;
}

export interface Office {
  id: string;
  name: string;
  branchName?: string | null;
  description?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  barangay?: string | null;
  city: string;
  province: string;
  region: string;
  zipCode: string;
  country: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumbers?: OfficePhone[];
  emailAddresses?: OfficeEmail[];
}

export interface CreateOfficeData {
  name: string;
  branchName?: string | null;
  description?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  barangay?: string | null;
  city: string;
  province: string;
  region: string;
  zipCode: string;
  country?: string;
  isActive?: boolean;
  phoneNumbers?: OfficePhone[];
  emailAddresses?: OfficeEmail[];
}

export interface UpdateOfficeData {
  name?: string;
  branchName?: string | null;
  description?: string | null;
  addressLine1?: string;
  addressLine2?: string | null;
  barangay?: string | null;
  city?: string;
  province?: string;
  region?: string;
  zipCode?: string;
  country?: string;
  isActive?: boolean;
  phoneNumbers?: OfficePhone[];
  emailAddresses?: OfficeEmail[];
}

class OfficeService {
  async getAll(): Promise<Office[]> {
    const response = await apiClient.get<Office[]>('/offices');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch offices');
    }
    return response.data;
  }

  async getById(id: string): Promise<Office> {
    const response = await apiClient.get<Office>(`/offices/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch office');
    }
    return response.data;
  }

  async create(data: CreateOfficeData): Promise<Office> {
    const response = await apiClient.post<Office>('/offices', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create office');
    }
    return response.data;
  }

  async update(id: string, data: UpdateOfficeData): Promise<Office> {
    const response = await apiClient.put<Office>(`/offices/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update office');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/offices/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete office');
    }
    return response.data!;
  }
}

export const officeService = new OfficeService();

