// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User and Authentication
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Material Management
export interface Material extends BaseEntity {
  name: string;
  type: string;
  brand: string;
  color: string;
  weight: number; // in grams
  costPerKg: number;
  currentStock: number; // in grams
  minimumStock: number; // in grams
  description?: string;
  supplier?: Supplier;
  supplierId?: string;
  location?: string;
}

export interface MaterialUsage extends BaseEntity {
  materialId: string;
  material: Material;
  projectId: string;
  project: Project;
  weight: number; // in grams
  cost: number;
  usedAt: string;
}

// Project Management
export interface Project extends BaseEntity {
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  startDate?: string;
  endDate?: string;
  estimatedCost: number;
  actualCost: number;
  materials: MaterialUsage[];
  imageUrl?: string;
}

// Supplier Management
export interface Supplier extends BaseEntity {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
  materials: Material[];
}

// Purchase Management
export interface Purchase extends BaseEntity {
  materialId: string;
  material: Material;
  supplierId?: string;
  supplier?: Supplier;
  quantity: number; // in grams
  unitCost: number;
  totalCost: number;
  purchaseDate: string;
  invoiceNumber?: string;
  notes?: string;
}

// Dashboard Analytics
export interface DashboardStats {
  totalMaterials: number;
  totalProjects: number;
  activeProjects: number;
  lowStockMaterials: number;
  totalInventoryValue: number;
  monthlySpending: number;
}

export interface MaterialWithStock extends Material {
  stockPercentage: number;
}

export interface MaterialUsageAnalytics {
  period: 'week' | 'month' | 'quarter' | 'year';
  totalUsage: number;
  usageByType: {
    type: string;
    weight: number;
    cost: number;
  }[];
}

export interface CostAnalysis {
  period: 'week' | 'month' | 'quarter' | 'year';
  totalCosts: number;
  materialCosts: number;
  averageProjectCost: number;
  costByProject: {
    projectName: string;
    cost: number;
  }[];
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: unknown;
  };
}

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

// Form Types
export interface MaterialFormData {
  name: string;
  type: string;
  brand: string;
  color: string;
  weight: number;
  costPerKg: number;
  currentStock: number;
  minimumStock: number;
  description?: string;
  supplierId?: string;
  location?: string;
}

export interface ProjectFormData {
  name: string;
  description?: string;
  status: Project['status'];
  startDate?: string;
  endDate?: string;
  estimatedCost: number;
}

export interface SupplierFormData {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
}

export interface PurchaseFormData {
  materialId: string;
  supplierId?: string;
  quantity: number;
  unitCost: number;
  purchaseDate: string;
  invoiceNumber?: string;
  notes?: string;
}

// Filter and Search Types
export interface MaterialFilters {
  type?: string;
  brand?: string;
  lowStock?: boolean;
  supplierId?: string;
}

export interface ProjectFilters {
  status?: Project['status'];
  startDate?: string;
  endDate?: string;
}

export interface PurchaseFilters {
  materialId?: string;
  supplierId?: string;
  startDate?: string;
  endDate?: string;
}

// Component Props Types
export interface TableColumn<T = unknown> {
  key: keyof T | string;
  title: string;
  render?: (value: unknown, record: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
