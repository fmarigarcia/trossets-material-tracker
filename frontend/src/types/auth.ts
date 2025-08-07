import { BaseEntity } from './base';

/**
 * User entity representing application users
 */
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  /** @deprecated Use firstName + lastName instead */
  name?: string;
}

/**
 * Authentication response from login/register endpoints
 */
export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Registration request payload
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
