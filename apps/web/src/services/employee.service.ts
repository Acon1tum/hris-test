import { apiClient } from '@/lib/api-client';

export interface Employee {
  id: string;
  employeeNumber: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  department?: {
    id: string;
    name: string;
  } | null;
  designation?: {
    id: string;
    title: string;
  } | null;
}

class EmployeeService {
  async getAll(): Promise<Employee[]> {
    // This is a placeholder - you'll need to implement the actual employees endpoint
    // For now, this will be used for department head selection
    const response = await apiClient.get<Employee[]>('/employees');
    if (!response.success || !response.data) {
      // If employees endpoint doesn't exist yet, return empty array
      return [];
    }
    return response.data;
  }

  async getById(id: string): Promise<Employee> {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch employee');
    }
    return response.data;
  }
}

export const employeeService = new EmployeeService();

