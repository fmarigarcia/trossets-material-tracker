import axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 * Base HTTP client with configured interceptors and error handling
 */
export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Helper method to handle API responses with proper error handling
   */
  async handleResponse<T>(promise: Promise<AxiosResponse>): Promise<T> {
    try {
      const response = await promise;
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown } };
      throw axiosError.response?.data || { success: false, error: { message: 'Network error' } };
    }
  }

  /**
   * Get the axios instance for making HTTP requests
   */
  getClient(): AxiosInstance {
    return this.client;
  }
}

// Create a singleton instance
export const httpClient = new HttpClient();
