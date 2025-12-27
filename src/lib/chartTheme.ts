export const chartColors = {
  primary: '#FF9900',    // amber-500
  secondary: '#D4AF37',  // gold-500
  success: '#10B981',    // green-500
  warning: '#FFC107',    // yellow-500
  error: '#EF4444',      // red-500
  grid: '#374151',       // gray-700
  text: '#E5E7EB',       // gray-200
  background: '#1F2937', // gray-800
  tooltip: '#111827',    // gray-900

  // Order status colors (matching existing dashboard)
  PENDING: '#EAB308',
  CONFIRMED: '#3B82F6',
  PREPARING: '#F97316',
  OUT_FOR_DELIVERY: '#A855F7',
  DELIVERED: '#10B981',
  CANCELLED: '#EF4444',
};

export const chartConfig = {
  margin: { top: 20, right: 30, left: 20, bottom: 20 },
  fontSize: 12,
  fontFamily: 'Inter, sans-serif',
};

export const statusColors: Record<string, string> = {
  PENDING: chartColors.PENDING,
  CONFIRMED: chartColors.CONFIRMED,
  PREPARING: chartColors.PREPARING,
  OUT_FOR_DELIVERY: chartColors.OUT_FOR_DELIVERY,
  DELIVERED: chartColors.DELIVERED,
  CANCELLED: chartColors.CANCELLED,
};
