import { httpClient } from './client';
import type {
  ApiResponse,
  DashboardStats,
  MaterialWithStock,
  Project,
  MaterialUsageAnalytics,
  CostAnalysis,
} from '@/types';

/**
 * Dashboard API endpoints
 */
export class DashboardApi {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return httpClient.handleResponse<ApiResponse<DashboardStats>>(
      httpClient.getClient().get('/dashboard/stats')
    );
  }

  /**
   * Get materials with low stock levels
   */
  async getLowStockMaterials(): Promise<ApiResponse<MaterialWithStock[]>> {
    return httpClient.handleResponse<ApiResponse<MaterialWithStock[]>>(
      httpClient.getClient().get('/dashboard/low-stock')
    );
  }

  /**
   * Get recent projects with optional limit
   */
  async getRecentProjects(limit?: number): Promise<ApiResponse<Project[]>> {
    return httpClient.handleResponse<ApiResponse<Project[]>>(
      httpClient.getClient().get('/dashboard/recent-projects', { params: { limit } })
    );
  }

  /**
   * Get material usage analytics for a specific period
   */
  async getMaterialUsageAnalytics(period?: string): Promise<ApiResponse<MaterialUsageAnalytics>> {
    return httpClient.handleResponse<ApiResponse<MaterialUsageAnalytics>>(
      httpClient.getClient().get('/dashboard/material-usage', { params: { period } })
    );
  }

  /**
   * Get cost analysis for a specific period
   */
  async getCostAnalysis(period?: string): Promise<ApiResponse<CostAnalysis>> {
    return httpClient.handleResponse<ApiResponse<CostAnalysis>>(
      httpClient.getClient().get('/dashboard/cost-analysis', { params: { period } })
    );
  }
}

// Create singleton instance
export const dashboardApi = new DashboardApi();
