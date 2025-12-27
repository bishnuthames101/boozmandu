export type TimePeriod = 'today' | 'week' | 'month' | 'all';

export interface RevenueData {
  total: number;
  trend: Array<{ date: string; amount: number }>;
  comparisonToPrevious: number;
}

export interface OrderAnalytics {
  total: number;
  statusBreakdown: Array<{ status: string; count: number; percentage: number }>;
  trend: Array<{ date: string; count: number }>;
}

export interface TopProduct {
  productId: string;
  productName: string;
  quantitySold: number;
  revenue: number;
}

export interface TopCategory {
  category: string;
  quantitySold: number;
  revenue: number;
}

export interface CustomerAnalytics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  averageOrderValue: number;
}

export interface AnalyticsData {
  period: TimePeriod;
  startDate: string;
  endDate: string;
  revenue: RevenueData;
  orders: OrderAnalytics;
  topProducts: TopProduct[];
  topCategories: TopCategory[];
  customers: CustomerAnalytics;
}
