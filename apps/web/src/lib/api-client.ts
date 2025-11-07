import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse } from '@hris/shared-types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    // In production Docker environment, use relative path to leverage Next.js rewrites
    // In development, use NEXT_PUBLIC_API_URL or default to localhost
    const getBaseURL = () => {
      if (typeof window !== 'undefined') {
        // Client-side: detect if we're in production
        const isProduction = window.location.hostname !== 'localhost' && 
                            window.location.hostname !== '127.0.0.1';
        
        // In production, always use relative path (works with Next.js rewrites in Docker)
        if (isProduction) {
          return '/api/v1';
        }
        
        // In development, use NEXT_PUBLIC_API_URL or default to localhost
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (apiUrl && !apiUrl.startsWith('/')) {
          // Full URL provided (e.g., https://example.com/api/v1)
          return apiUrl;
        }
        // Relative path or empty - use localhost for development
        return apiUrl || 'http://localhost:3001/api/v1';
      }
      // Server-side: use environment variable or default
      return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    };

    this.client = axios.create({
      baseURL: getBaseURL(),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiResponse>) => {
        if (error.response?.status === 401) {
          // Handle token refresh or redirect to login
          localStorage.removeItem('accessToken');
          // Only redirect if not already on login page
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
        // Extract error message from response
        const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
        const apiError = new Error(errorMessage);
        (apiError as any).response = error.response;
        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

export const apiClient = new ApiClient();

