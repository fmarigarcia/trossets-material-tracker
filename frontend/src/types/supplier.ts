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
 * Supplier entity for managing material suppliers
 */
export interface Supplier extends BaseEntity {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
  materials: Material[];
}

/**
 * Form data interface for creating/updating suppliers
 */
export interface SupplierFormData {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
}
