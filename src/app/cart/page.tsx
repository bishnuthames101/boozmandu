'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import CartItem from '@/components/ui/CartItem';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, getCartTotal, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return `NPR ${price.toLocaleString()}`;
  };

  return (
    <div className="py-16 pt-32">
      <div className="container">
        <h1 className="text-3xl font-display font-semibold mb-6 flex items-center">
          <ShoppingCart className="mr-3 text-amber-500" /> Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-gray-800 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
            <Link
              href="/products"
              className="btn-primary"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <motion.div
              className="lg:w-2/3 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}

              <div className="flex justify-between mt-4">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-400 text-sm font-medium"
                >
                  Clear Cart
                </button>
                <Link
                  href="/products"
                  className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="lg:w-1/3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
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

                <div className="bg-gray-700 p-3 rounded-md mb-6 flex items-start">
                  <AlertCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5 mr-2" />
                  <p className="text-sm text-gray-300">
                    Cash on Delivery is the only payment method available. We do not sell alcohol to persons under 21 years.
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="btn-primary w-full justify-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
