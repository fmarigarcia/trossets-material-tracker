import { httpClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  Purchase,
  PurchaseFormData,
  PurchaseFilters,
} from '@/types';

/**
 * Purchases API endpoints
 */
export class PurchasesApi {
  /**
   * Get paginated list of purchases with optional filters
   */
  async getPurchases(
    filters?: PurchaseFilters,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<Purchase>> {
    return httpClient.handleResponse<PaginatedResponse<Purchase>>(
      httpClient.getClient().get('/purchases', { params: { ...filters, page, limit } })
    );
  }

  /**
   * Get purchase by ID
   */
  async getPurchase(id: string): Promise<ApiResponse<Purchase>> {
    return httpClient.handleResponse<ApiResponse<Purchase>>(
      httpClient.getClient().get(`/purchases/${id}`)
    );
  }

  /**
   * Create new purchase
   */
  async createPurchase(data: PurchaseFormData): Promise<ApiResponse<Purchase>> {
    return httpClient.handleResponse<ApiResponse<Purchase>>(
      httpClient.getClient().post('/purchases', data)
    );
  }

  /**
   * Update existing purchase
   */
  async updatePurchase(
    id: string,
    data: Partial<PurchaseFormData>
  ): Promise<ApiResponse<Purchase>> {
    return httpClient.handleResponse<ApiResponse<Purchase>>(
      httpClient.getClient().put(`/purchases/${id}`, data)
    );
  }

  /**
   * Delete purchase by ID
   */
  async deletePurchase(id: string): Promise<ApiResponse> {
    return httpClient.handleResponse<ApiResponse>(
      httpClient.getClient().delete(`/purchases/${id}`)
    );
  }
}

// Create singleton instance
export const purchasesApi = new PurchasesApi();
