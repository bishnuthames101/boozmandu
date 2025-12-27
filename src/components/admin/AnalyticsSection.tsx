'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { TimePeriod, AnalyticsData } from '@/types/analytics';
import RevenueChart from './RevenueChart';
import OrderStatusChart from './OrderStatusChart';
import TopProductsChart from './TopProductsChart';
import CategoryPerformanceChart from './CategoryPerformanceChart';
import CustomerMetricsCards from './CustomerMetricsCards';

interface Props {
  token: string;
}

export default function AnalyticsSection({ token }: Props) {
  const [period, setPeriod] = useState<TimePeriod>('week');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/analytics?period=${period}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }

        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [period, token]);

  const periods: { value: TimePeriod; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center">
        <p className="text-red-500 mb-4">{error || 'Failed to load analytics'}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-secondary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Time Period Tabs */}
      <div className="flex flex-wrap gap-2">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              period === p.value
                ? 'bg-amber-500 text-dark'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Revenue Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold flex items-center">
          <TrendingUp className="text-amber-500 w-6 h-6 mr-2" />
          Revenue Analytics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Revenue Card */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <p className="text-sm text-gray-400 mb-2">Total Revenue</p>
            <p className="text-3xl font-semibold text-amber-500 mb-3">
              NPR {data.revenue.total.toLocaleString()}
            </p>
            <div className="flex items-center">
              {data.revenue.comparisonToPrevious >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm ${
                  data.revenue.comparisonToPrevious >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {Math.abs(data.revenue.comparisonToPrevious).toFixed(1)}% vs previous period
              </span>
            </div>
          </div>

          {/* Orders Count Card */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <p className="text-sm text-gray-400 mb-2">Total Orders</p>
            <p className="text-3xl font-semibold text-white mb-3">
              {data.orders.total.toLocaleString()}
            </p>
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 text-amber-500 mr-1" />
              <span className="text-sm text-gray-400">
                Across all statuses
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-lg font-medium mb-4">Revenue Trend</h4>
          <RevenueChart data={data.revenue.trend} />
        </div>
      </motion.div>

      {/* Orders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold">Order Analytics</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Order Status Breakdown */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h4 className="text-lg font-medium mb-4">Order Status Distribution</h4>
            <OrderStatusChart data={data.orders.statusBreakdown} />
          </div>

          {/* Order Trend */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h4 className="text-lg font-medium mb-4">Order Count Trend</h4>
            <RevenueChart data={data.orders.trend.map(t => ({ date: t.date, amount: t.count }))} />
          </div>
        </div>
      </motion.div>

      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold">Product Performance</h3>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-lg font-medium mb-4">Top 10 Products by Revenue</h4>
          {data.topProducts.length > 0 ? (
            <TopProductsChart data={data.topProducts} />
          ) : (
            <p className="text-gray-400 text-center py-8">No product data available</p>
          )}
        </div>
      </motion.div>

      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold">Category Performance</h3>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-lg font-medium mb-4">Sales by Category</h4>
          {data.topCategories.length > 0 ? (
            <CategoryPerformanceChart data={data.topCategories} />
          ) : (
            <p className="text-gray-400 text-center py-8">No category data available</p>
          )}
        </div>
      </motion.div>

      {/* Customer Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold">Customer Insights</h3>
        <CustomerMetricsCards data={data.customers} />
      </motion.div>
    </div>
  );
}
