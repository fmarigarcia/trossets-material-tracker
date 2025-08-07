import { MaterialWithStock } from './material';

/**
 * Dashboard statistics summary
 */
export interface DashboardStats {
  totalMaterials: number;
  totalProjects: number;
  activeProjects: number;
  lowStockMaterials: number;
  totalInventoryValue: number;
  monthlySpending: number;
}

/**
 * Analytics period type
 */
export type AnalyticsPeriod = 'week' | 'month' | 'quarter' | 'year';

/**
 * Material usage analytics data
 */
export interface MaterialUsageAnalytics {
  period: AnalyticsPeriod;
  totalUsage: number;
  usageByType: {
    type: string;
    weight: number;
    cost: number;
  }[];
}

/**
 * Cost analysis data for dashboard
 */
export interface CostAnalysis {
  period: AnalyticsPeriod;
  totalCosts: number;
  materialCosts: number;
  averageProjectCost: number;
  costByProject: {
    projectName: string;
    cost: number;
  }[];
}

// Re-export MaterialWithStock for dashboard usage
export type { MaterialWithStock };
