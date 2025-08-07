import { BaseEntity } from './base';

/**
 * Forward declaration for supplier to avoid circular imports
 */
interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
}

/**
 * Material entity for managing 3D printing materials
 */
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

/**
 * Extended material interface with stock percentage calculation
 */
export interface MaterialWithStock extends Material {
  stockPercentage: number;
}

/**
 * Form data interface for creating/updating materials
 */
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

/**
 * Filter options for material queries
 */
export interface MaterialFilters {
  type?: string;
  brand?: string;
  lowStock?: boolean;
  supplierId?: string;
}
