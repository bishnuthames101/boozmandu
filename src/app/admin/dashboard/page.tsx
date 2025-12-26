'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Package, ShoppingCart, DollarSign, TrendingUp, Search, Filter } from 'lucide-react';

interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Token invalid or expired
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
        return;
      }

      const data = await response.json();
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setIsLoading(false);
    }
  }, [router]);

  const filterOrders = useCallback(() => {
    let filtered = [...orders];

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchTerm]);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    fetchOrders();
  }, [router, fetchOrders]);

  useEffect(() => {
    filterOrders();
  }, [filterOrders]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
        return;
      }

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const formatPrice = (price: number) => `NPR ${price.toLocaleString()}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-500/20 text-yellow-500',
      CONFIRMED: 'bg-blue-500/20 text-blue-500',
      PREPARING: 'bg-orange-500/20 text-orange-500',
      OUT_FOR_DELIVERY: 'bg-purple-500/20 text-purple-500',
      DELIVERED: 'bg-green-500/20 text-green-500',
      CANCELLED: 'bg-red-500/20 text-red-500',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-500';
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'PENDING').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    deliveredOrders: orders.filter(o => o.status === 'DELIVERED').length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="py-16 pt-24 min-h-screen bg-dark">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-semibold">
            Admin <span className="text-amber-500">Dashboard</span>
          </h1>
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-amber-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.pendingOrders}</p>
              </div>
              <Package className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Delivered</p>
                <p className="text-2xl font-bold text-green-500">{stats.deliveredOrders}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-amber-500">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by customer name, phone, or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PREPARING">Preparing</option>
                <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        #{order.id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{order.customerName}</div>
                        <div className="text-xs text-gray-400">{order.customerPhone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {order.items.length} item(s)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-amber-500">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-gray-700 text-white px-2 py-1 rounded text-xs border border-gray-600"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PREPARING">Preparing</option>
                          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
