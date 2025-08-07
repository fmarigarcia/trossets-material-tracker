import { httpClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  Material,
  MaterialFormData,
  MaterialFilters,
} from '@/types';

/**
 * Materials API endpoints
 */
export class MaterialsApi {
  /**
   * Get paginated list of materials with optional filters
   */
  async getMaterials(
    filters?: MaterialFilters,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<Material>> {
    return httpClient.handleResponse<PaginatedResponse<Material>>(
      httpClient.getClient().get('/materials', { params: { ...filters, page, limit } })
    );
  }

  /**
   * Get material by ID
   */
  async getMaterial(id: string): Promise<ApiResponse<Material>> {
    return httpClient.handleResponse<ApiResponse<Material>>(
      httpClient.getClient().get(`/materials/${id}`)
    );
  }

  /**
   * Create new material
   */
  async createMaterial(data: MaterialFormData): Promise<ApiResponse<Material>> {
    return httpClient.handleResponse<ApiResponse<Material>>(
      httpClient.getClient().post('/materials', data)
    );
  }

  /**
   * Update existing material
   */
  async updateMaterial(
    id: string,
    data: Partial<MaterialFormData>
  ): Promise<ApiResponse<Material>> {
    return httpClient.handleResponse<ApiResponse<Material>>(
      httpClient.getClient().put(`/materials/${id}`, data)
    );
  }

  /**
   * Delete material by ID
   */
  async deleteMaterial(id: string): Promise<ApiResponse> {
    return httpClient.handleResponse<ApiResponse>(
      httpClient.getClient().delete(`/materials/${id}`)
    );
  }
}

// Create singleton instance
export const materialsApi = new MaterialsApi();
