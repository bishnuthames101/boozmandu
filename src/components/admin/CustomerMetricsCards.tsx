import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Repeat, DollarSign } from 'lucide-react';
import { CustomerAnalytics } from '@/types/analytics';

interface Props {
  data: CustomerAnalytics;
}

export default function CustomerMetricsCards({ data }: Props) {
  const metrics = [
    {
      label: 'Total Customers',
      value: data.totalCustomers.toLocaleString(),
      icon: Users,
      color: 'text-amber-500',
    },
    {
      label: 'New Customers',
      value: data.newCustomers.toLocaleString(),
      icon: UserPlus,
      color: 'text-green-500',
    },
    {
      label: 'Returning Customers',
      value: data.returningCustomers.toLocaleString(),
      icon: Repeat,
      color: 'text-blue-500',
    },
    {
      label: 'Avg Order Value',
      value: `NPR ${data.averageOrderValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
              <p className="text-2xl font-semibold text-white">{metric.value}</p>
            </div>
            <metric.icon className={`w-8 h-8 ${metric.color}`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
