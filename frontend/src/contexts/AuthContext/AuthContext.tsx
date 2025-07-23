'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types';
import { apiClient } from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'CLEAR_AUTH' }
  | { type: 'SET_AUTH'; payload: { user: User; token: string } };

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_AUTH':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'CLEAR_AUTH':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          dispatch({ type: 'SET_TOKEN', payload: token });

          // Verify token and get user profile
          const response = await apiClient.getProfile();
          if (response.success && response.data) {
            dispatch({ type: 'SET_USER', payload: response.data });
          } else {
            // Invalid token, clear it
            localStorage.removeItem('auth_token');
            dispatch({ type: 'CLEAR_AUTH' });
          }
        } else {
          dispatch({ type: 'CLEAR_AUTH' });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('auth_token');
        dispatch({ type: 'CLEAR_AUTH' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiClient.login(credentials);

      if (response.success && response.data) {
        const { user, token } = response.data;
        localStorage.setItem('auth_token', token);
        dispatch({ type: 'SET_AUTH', payload: { user, token } });
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error(error.error?.message || 'Login failed');
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiClient.register(userData);

      if (response.success && response.data) {
        const { user, token } = response.data;
        localStorage.setItem('auth_token', token);
        dispatch({ type: 'SET_AUTH', payload: { user, token } });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error(error.error?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      dispatch({ type: 'CLEAR_AUTH' });
    }
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.getProfile();
      if (response.success && response.data) {
        dispatch({ type: 'SET_USER', payload: response.data });
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
