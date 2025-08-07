/**
 * Base types and interfaces shared across the application
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: unknown;
  };
}

/**
 * Paginated API response wrapper
 */
export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

/**
 * Generic select option for dropdowns and forms
 */
export interface SelectOption {
  value: string;
  label: string;
}
