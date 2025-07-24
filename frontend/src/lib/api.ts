import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  ApiResponse,
  PaginatedResponse,
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Material,
  MaterialFormData,
  MaterialFilters,
  Project,
  ProjectFormData,
  ProjectFilters,
  Supplier,
  SupplierFormData,
  Purchase,
  PurchaseFormData,
  PurchaseFilters,
  DashboardStats,
  MaterialWithStock,
  MaterialUsageAnalytics,
  CostAnalysis,
} from '@/types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

  // Helper method to handle API responses
  private async handleResponse<T>(promise: Promise<AxiosResponse>): Promise<T> {
    try {
      const response = await promise;
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown } };
      throw axiosError.response?.data || { success: false, error: { message: 'Network error' } };
    }
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.handleResponse<AuthResponse>(this.client.post('/auth/login', credentials));
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.handleResponse<AuthResponse>(this.client.post('/auth/register', userData));
  }

  async logout(): Promise<ApiResponse> {
    return this.handleResponse<ApiResponse>(this.client.post('/auth/logout'));
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.handleResponse<ApiResponse<User>>(this.client.get('/auth/profile'));
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.handleResponse<ApiResponse<DashboardStats>>(this.client.get('/dashboard/stats'));
  }

  async getLowStockMaterials(): Promise<ApiResponse<MaterialWithStock[]>> {
    return this.handleResponse<ApiResponse<MaterialWithStock[]>>(
      this.client.get('/dashboard/low-stock')
    );
  }

  async getRecentProjects(limit?: number): Promise<ApiResponse<Project[]>> {
    return this.handleResponse<ApiResponse<Project[]>>(
      this.client.get('/dashboard/recent-projects', { params: { limit } })
    );
  }

  async getMaterialUsageAnalytics(period?: string): Promise<ApiResponse<MaterialUsageAnalytics>> {
    return this.handleResponse<ApiResponse<MaterialUsageAnalytics>>(
      this.client.get('/dashboard/material-usage', { params: { period } })
    );
  }

  async getCostAnalysis(period?: string): Promise<ApiResponse<CostAnalysis>> {
    return this.handleResponse<ApiResponse<CostAnalysis>>(
      this.client.get('/dashboard/cost-analysis', { params: { period } })
    );
  }

  // Materials endpoints
  async getMaterials(
    filters?: MaterialFilters,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<Material>> {
    return this.handleResponse<PaginatedResponse<Material>>(
      this.client.get('/materials', { params: { ...filters, page, limit } })
    );
  }

  async getMaterial(id: string): Promise<ApiResponse<Material>> {
    return this.handleResponse<ApiResponse<Material>>(this.client.get(`/materials/${id}`));
  }

  async createMaterial(data: MaterialFormData): Promise<ApiResponse<Material>> {
    return this.handleResponse<ApiResponse<Material>>(this.client.post('/materials', data));
  }

  async updateMaterial(
    id: string,
    data: Partial<MaterialFormData>
  ): Promise<ApiResponse<Material>> {
    return this.handleResponse<ApiResponse<Material>>(this.client.put(`/materials/${id}`, data));
  }

  async deleteMaterial(id: string): Promise<ApiResponse> {
    return this.handleResponse<ApiResponse>(this.client.delete(`/materials/${id}`));
  }

  // Projects endpoints
  async getProjects(
    filters?: ProjectFilters,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<Project>> {
    return this.handleResponse<PaginatedResponse<Project>>(
      this.client.get('/projects', { params: { ...filters, page, limit } })
    );
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    return this.handleResponse<ApiResponse<Project>>(this.client.get(`/projects/${id}`));
  }

  async createProject(data: ProjectFormData): Promise<ApiResponse<Project>> {
    return this.handleResponse<ApiResponse<Project>>(this.client.post('/projects', data));
  }

  async updateProject(id: string, data: Partial<ProjectFormData>): Promise<ApiResponse<Project>> {
    return this.handleResponse<ApiResponse<Project>>(this.client.put(`/projects/${id}`, data));
  }

  async deleteProject(id: string): Promise<ApiResponse> {
    return this.handleResponse<ApiResponse>(this.client.delete(`/projects/${id}`));
  }

  // Suppliers endpoints
  async getSuppliers(page?: number, limit?: number): Promise<PaginatedResponse<Supplier>> {
    return this.handleResponse<PaginatedResponse<Supplier>>(
      this.client.get('/suppliers', { params: { page, limit } })
    );
  }

  async getSupplier(id: string): Promise<ApiResponse<Supplier>> {
    return this.handleResponse<ApiResponse<Supplier>>(this.client.get(`/suppliers/${id}`));
  }

  async createSupplier(data: SupplierFormData): Promise<ApiResponse<Supplier>> {
    return this.handleResponse<ApiResponse<Supplier>>(this.client.post('/suppliers', data));
  }

  async updateSupplier(
    id: string,
    data: Partial<SupplierFormData>
  ): Promise<ApiResponse<Supplier>> {
    return this.handleResponse<ApiResponse<Supplier>>(this.client.put(`/suppliers/${id}`, data));
  }

  async deleteSupplier(id: string): Promise<ApiResponse> {
    return this.handleResponse<ApiResponse>(this.client.delete(`/suppliers/${id}`));
  }

  // Purchases endpoints
  async getPurchases(
    filters?: PurchaseFilters,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<Purchase>> {
    return this.handleResponse<PaginatedResponse<Purchase>>(
      this.client.get('/purchases', { params: { ...filters, page, limit } })
    );
  }

  async getPurchase(id: string): Promise<ApiResponse<Purchase>> {
    return this.handleResponse<ApiResponse<Purchase>>(this.client.get(`/purchases/${id}`));
  }

  async createPurchase(data: PurchaseFormData): Promise<ApiResponse<Purchase>> {
    return this.handleResponse<ApiResponse<Purchase>>(this.client.post('/purchases', data));
  }

  async updatePurchase(
    id: string,
    data: Partial<PurchaseFormData>
  ): Promise<ApiResponse<Purchase>> {
    return this.handleResponse<ApiResponse<Purchase>>(this.client.put(`/purchases/${id}`, data));
  }

  async deletePurchase(id: string): Promise<ApiResponse> {
    return this.handleResponse<ApiResponse>(this.client.delete(`/purchases/${id}`));
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();
export default apiClient;
