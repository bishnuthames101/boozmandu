'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CustomerInfo } from '@/types';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    notes: ''
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  // Update form when user logs in
  React.useEffect(() => {
    if (user) {
      setCustomerInfo(prev => ({
        ...prev,
        name: user.name,
        phone: user.phone,
        address: user.address
      }));
    }
  }, [user]);

  React.useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      router.push('/cart');
    }
  }, [cart, orderPlaced, router]);

  const formatPrice = (price: number) => {
    return `NPR ${price.toLocaleString()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};
    let isValid = true;

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^(98|97)\d{8}$/.test(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid Nepali phone number (e.g., 9801234567)';
      isValid = false;
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'Delivery address is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Create order via API
        const orderData = {
          userId: user?.id || null,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          customerAddress: customerInfo.address,
          notes: customerInfo.notes || null,
          total: getCartTotal() + 100,
          items: cart.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.image,
            quantity: item.quantity,
            price: item.product.price,
          })),
        };

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          setTimeout(() => {
            setOrderPlaced(true);
            clearCart();
          }, 1500);
        } else {
          alert('Failed to place order. Please try again.');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
    }
  };

  if (orderPlaced) {
    return (
      <div className="py-16 pt-32">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>

            <h1 className="text-3xl font-display font-semibold mb-3">Order Placed Successfully!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for your order. We&apos;ll contact you shortly on your phone to confirm your order details.
            </p>

            <div className="bg-gray-700 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-semibold mb-2">Delivery Information:</h3>
              <p className="text-gray-300"><span className="text-gray-400">Name:</span> {customerInfo.name}</p>
              <p className="text-gray-300"><span className="text-gray-400">Phone:</span> {customerInfo.phone}</p>
              <p className="text-gray-300"><span className="text-gray-400">Address:</span> {customerInfo.address}</p>
              {customerInfo.notes && (
                <p className="text-gray-300"><span className="text-gray-400">Notes:</span> {customerInfo.notes}</p>
              )}
            </div>

            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="py-16 pt-32">
      <div className="container">
        <h1 className="text-3xl font-display font-semibold mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {user && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
                <p className="text-amber-500 text-sm font-medium">
                  ✓ Signed in as {user.name} ({user.email})
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Your information has been pre-filled. You can modify it below if needed.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className={`input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className={`input ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="9801234567"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className={`input ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Your full address"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="input"
                    placeholder="Any special instructions for delivery"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-amber-500"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                  I confirm that I am over 21 years old and agree to the <Link href="/terms-of-service" className="text-amber-500 hover:text-amber-400">Terms of Service</Link>.
                </label>
              </div>

              <div className="bg-gray-700 p-3 rounded-md mb-6 flex items-start">
                <AlertCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5 mr-2" />
                <p className="text-sm text-gray-300">
                  Cash on Delivery is the only payment method available. Please have the exact amount ready at the time of delivery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link href="/cart" className="btn-secondary order-2 sm:order-1">
                  Back to Cart
                </Link>
                <button type="submit" className="btn-primary order-1 sm:order-2">
                  Place Order
                </button>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm text-amber-500 font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span>{formatPrice(100)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-amber-500">{formatPrice(getCartTotal() + 100)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
