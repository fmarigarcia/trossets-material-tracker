import { BaseEntity } from './base';

/**
 * Forward declaration for material to avoid circular imports
 */
interface Material {
  id: string;
  name: string;
  type: string;
  brand: string;
  color: string;
}

/**
 * Project status enumeration
 */
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'cancelled';

/**
 * Material usage tracking within projects
 */
export interface MaterialUsage extends BaseEntity {
  materialId: string;
  material: Material;
  projectId: string;
  project: Project;
  weight: number; // in grams
  cost: number;
  usedAt: string;
}

/**
 * Project entity for managing 3D printing projects
 */
export interface Project extends BaseEntity {
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  estimatedCost: number;
  actualCost: number;
  materials: MaterialUsage[];
  imageUrl?: string;
}

/**
 * Form data interface for creating/updating projects
 */
export interface ProjectFormData {
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  estimatedCost: number;
}

/**
 * Filter options for project queries
 */
export interface ProjectFilters {
  status?: ProjectStatus;
  startDate?: string;
  endDate?: string;
}
