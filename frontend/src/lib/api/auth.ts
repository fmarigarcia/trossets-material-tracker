import { httpClient } from './client';
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';

/**
 * Authentication API endpoints
 */
export class AuthApi {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return httpClient.handleResponse<AuthResponse>(
      httpClient.getClient().post('/auth/login', credentials)
    );
  }

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return httpClient.handleResponse<AuthResponse>(
      httpClient.getClient().post('/auth/register', userData)
    );
  }

  /**
   * Logout current user
   */
  async logout(): Promise<ApiResponse> {
    return httpClient.handleResponse<ApiResponse>(httpClient.getClient().post('/auth/logout'));
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiResponse<User>> {
    return httpClient.handleResponse<ApiResponse<User>>(httpClient.getClient().get('/auth/me'));
  }
}

// Create singleton instance
export const authApi = new AuthApi();
