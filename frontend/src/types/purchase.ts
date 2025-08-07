import { BaseEntity } from './base';

/**
 * Forward declarations to avoid circular imports
 */
interface Material {
  id: string;
  name: string;
  type: string;
  brand: string;
  color: string;
}

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
 * Purchase entity for tracking material purchases
 */
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

/**
 * Form data interface for creating/updating purchases
 */
export interface PurchaseFormData {
  materialId: string;
  supplierId?: string;
  quantity: number;
  unitCost: number;
  purchaseDate: string;
  invoiceNumber?: string;
  notes?: string;
}

/**
 * Filter options for purchase queries
 */
export interface PurchaseFilters {
  materialId?: string;
  supplierId?: string;
  startDate?: string;
  endDate?: string;
}
