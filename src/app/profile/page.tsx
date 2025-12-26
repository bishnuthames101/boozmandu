'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Phone, Mail, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  status: string;
  createdAt: Date;
  items: {
    id: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const fetchUserOrders = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/orders?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      // Fetch user orders from API
      fetchUserOrders();

      setEditForm({
        name: user.name,
        phone: user.phone,
        address: user.address
      });
    }
  }, [user, fetchUserOrders]);

  const formatPrice = (price: number) => {
    return `NPR ${price.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'confirmed': return 'text-blue-500';
      case 'preparing': return 'text-orange-500';
      case 'out_for_delivery': return 'text-purple-500';
      case 'delivered': return 'text-green-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user in the backend
    // For now, we'll update localStorage
    const users = JSON.parse(localStorage.getItem('boozmandu_users') || '[]');
    const updatedUsers = users.map((u: any) =>
      u.id === user?.id ? { ...u, ...editForm } : u
    );
    localStorage.setItem('boozmandu_users', JSON.stringify(updatedUsers));

    // Update current user in localStorage
    const updatedUser = { ...user, ...editForm };
    localStorage.setItem('boozmandu_user', JSON.stringify(updatedUser));

    setIsEditing(false);
    // In a real app, you'd also update the auth context
    window.location.reload(); // Simple refresh to update user data
  };

  if (!user) {
    return (
      <div className="py-16 pt-32">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-display font-semibold mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 pt-32">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-semibold mb-8 flex items-center">
            <User className="text-amber-500 w-8 h-8 mr-3" />
            My Profile
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-amber-500 hover:text-amber-400 p-2"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-gray-400 hover:text-white p-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Address
                      </label>
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                        className="input resize-none"
                        rows={3}
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-sm text-gray-400">Name</p>
                        <p className="text-white">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white">{user.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-amber-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Address</p>
                        <p className="text-white">{user.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order History */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Package className="text-amber-500 w-6 h-6 mr-2" />
                  Order History
                </h2>

                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No orders yet</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Your order history will appear here once you place your first order.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-medium">Order #{order.id.slice(-8)}</p>
                            <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </p>
                            <p className="text-amber-500 font-semibold">{formatPrice(order.total)}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="text-sm font-medium">{item.productName}</p>
                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-sm text-amber-500">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
