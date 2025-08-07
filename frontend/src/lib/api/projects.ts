import { httpClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  Project,
  ProjectFormData,
  ProjectFilters,
} from '@/types';

/**
 * Projects API endpoints
 */
export class ProjectsApi {
  /**
   * Get paginated list of projects with optional filters
   */
  async getProjects(
    filters?: ProjectFilters,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<Project>> {
    return httpClient.handleResponse<PaginatedResponse<Project>>(
      httpClient.getClient().get('/projects', { params: { ...filters, page, limit } })
    );
  }

  /**
   * Get project by ID
   */
  async getProject(id: string): Promise<ApiResponse<Project>> {
    return httpClient.handleResponse<ApiResponse<Project>>(
      httpClient.getClient().get(`/projects/${id}`)
    );
  }

  /**
   * Create new project
   */
  async createProject(data: ProjectFormData): Promise<ApiResponse<Project>> {
    return httpClient.handleResponse<ApiResponse<Project>>(
      httpClient.getClient().post('/projects', data)
    );
  }

  /**
   * Update existing project
   */
  async updateProject(id: string, data: Partial<ProjectFormData>): Promise<ApiResponse<Project>> {
    return httpClient.handleResponse<ApiResponse<Project>>(
      httpClient.getClient().put(`/projects/${id}`, data)
    );
  }

  /**
   * Delete project by ID
   */
  async deleteProject(id: string): Promise<ApiResponse> {
    return httpClient.handleResponse<ApiResponse>(httpClient.getClient().delete(`/projects/${id}`));
  }
}

// Create singleton instance
export const projectsApi = new ProjectsApi();
