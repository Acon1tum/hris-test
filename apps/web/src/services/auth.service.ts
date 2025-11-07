import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@hris/shared-types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    permissions: string[];
    modules: string[];
  };
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
  modules: string[];
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Login failed');
    }
    return response.data;
  }

  async register(data: RegisterData): Promise<User> {
    const response = await apiClient.post<User>('/auth/register', data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Registration failed');
    }
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to get current user');
    }
    return response.data;
  }

  async logout(): Promise<void> {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    // You can also call a logout endpoint if you have one
    // await apiClient.post('/auth/logout');
  }
}

export const authService = new AuthService();

