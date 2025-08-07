import { httpClient } from './client';
import type { ApiResponse, PaginatedResponse, Supplier, SupplierFormData } from '@/types';

/**
 * Suppliers API endpoints
 */
export class SuppliersApi {
  /**
   * Get paginated list of suppliers
   */
  async getSuppliers(page?: number, limit?: number): Promise<PaginatedResponse<Supplier>> {
    return httpClient.handleResponse<PaginatedResponse<Supplier>>(
      httpClient.getClient().get('/suppliers', { params: { page, limit } })
    );
  }

  /**
   * Get supplier by ID
   */
  async getSupplier(id: string): Promise<ApiResponse<Supplier>> {
    return httpClient.handleResponse<ApiResponse<Supplier>>(
      httpClient.getClient().get(`/suppliers/${id}`)
    );
  }

  /**
   * Create new supplier
   */
  async createSupplier(data: SupplierFormData): Promise<ApiResponse<Supplier>> {
    return httpClient.handleResponse<ApiResponse<Supplier>>(
      httpClient.getClient().post('/suppliers', data)
    );
  }

  /**
   * Update existing supplier
   */
  async updateSupplier(
    id: string,
    data: Partial<SupplierFormData>
  ): Promise<ApiResponse<Supplier>> {
    return httpClient.handleResponse<ApiResponse<Supplier>>(
      httpClient.getClient().put(`/suppliers/${id}`, data)
    );
  }

  /**
   * Delete supplier by ID
   */
  async deleteSupplier(id: string): Promise<ApiResponse> {
    return httpClient.handleResponse<ApiResponse>(
      httpClient.getClient().delete(`/suppliers/${id}`)
    );
  }
}

// Create singleton instance
export const suppliersApi = new SuppliersApi();
