import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@hris/shared-types';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  currencyCode: string;
  dayFormat: string;
  timeFormat: string;
  timeZone: string;
  domain?: string | null;
  employeeIdLabel: string;
  avatar?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationData {
  name: string;
  slug: string;
  currencyCode: string;
  dayFormat: string;
  timeFormat: string;
  timeZone: string;
  domain?: string;
  employeeIdLabel: string;
  avatar?: string;
  isActive?: boolean;
}

export interface UpdateOrganizationData {
  name?: string;
  slug?: string;
  currencyCode?: string;
  dayFormat?: string;
  timeFormat?: string;
  timeZone?: string;
  domain?: string | null;
  employeeIdLabel?: string;
  avatar?: string | null;
  isActive?: boolean;
}

class OrganizationService {
  async getAll(): Promise<Organization[]> {
    const response = await apiClient.get<Organization[]>('/organizations');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch organizations');
    }
    return response.data;
  }

  async getById(id: string): Promise<Organization> {
    const response = await apiClient.get<Organization>(`/organizations/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch organization');
    }
    return response.data;
  }

  async getBySlug(slug: string): Promise<Organization> {
    const response = await apiClient.get<Organization>(`/organizations/slug/${slug}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch organization');
    }
    return response.data;
  }

  async create(data: CreateOrganizationData): Promise<Organization> {
    const response = await apiClient.post<Organization>('/organizations', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create organization');
    }
    return response.data;
  }

  async update(id: string, data: UpdateOrganizationData): Promise<Organization> {
    const response = await apiClient.put<Organization>(`/organizations/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update organization');
    }
    return response.data;
  }

  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`/organizations/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete organization');
    }
  }
}

export const organizationService = new OrganizationService();

