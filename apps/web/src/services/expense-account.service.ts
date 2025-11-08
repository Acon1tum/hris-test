import { apiClient } from '@/lib/api-client';

export type ExpenseAccountFromAPI = {
  id: string;
  name: string;
  code: string;
  accountNumber: string;
  description: string | null;
  expenseType: string | null;
  account: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateExpenseAccountData {
  name: string;
  code: string;
  accountNumber: string;
  description?: string | null;
  expenseType?: string | null;
  account?: string | null;
  isActive?: boolean;
}

export interface UpdateExpenseAccountData {
  name?: string;
  code?: string;
  accountNumber?: string;
  description?: string | null;
  expenseType?: string | null;
  account?: string | null;
  isActive?: boolean;
}

class ExpenseAccountService {
  async getAll(): Promise<ExpenseAccountFromAPI[]> {
    const response = await apiClient.get<ExpenseAccountFromAPI[]>('/expense-accounts');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch expense accounts');
    }
    return response.data;
  }

  async getById(id: string): Promise<ExpenseAccountFromAPI> {
    const response = await apiClient.get<ExpenseAccountFromAPI>(`/expense-accounts/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch expense account');
    }
    return response.data;
  }

  async create(data: CreateExpenseAccountData): Promise<ExpenseAccountFromAPI> {
    const response = await apiClient.post<ExpenseAccountFromAPI>('/expense-accounts', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create expense account');
    }
    return response.data;
  }

  async update(id: string, data: UpdateExpenseAccountData): Promise<ExpenseAccountFromAPI> {
    const response = await apiClient.put<ExpenseAccountFromAPI>(`/expense-accounts/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update expense account');
    }
    return response.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/expense-accounts/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete expense account');
    }
    return response.data!;
  }
}

export const expenseAccountService = new ExpenseAccountService();
