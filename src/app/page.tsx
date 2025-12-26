'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Shield, Truck } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { getFeaturedProducts } from '@/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center bg-cover bg-center pt-16"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(17, 17, 17, 0.9), rgba(17, 17, 17, 0.7)), url("https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
              <span className="text-amber-500">Nepal&apos;s Fastest</span> Online Liquor Delivery
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Premium spirits, wines & beers delivered to your doorstep in Kathmandu valley. Order now for fast home delivery.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products" className="btn-primary">
                Browse Collection
              </Link>
              <Link href="/products" className="btn-secondary">
                Featured Products
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight className="w-8 h-8 text-amber-500 transform rotate-90" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-darker">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-amber-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-amber-500 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-400">We deliver within 60 minutes in Kathmandu valley. Order now for quick service.</p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-amber-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-amber-500 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Genuine Products</h3>
              <p className="text-gray-400">All our products are sourced directly from authorized distributors. 100% authentic.</p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-amber-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Truck className="text-amber-500 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cash on Delivery</h3>
              <p className="text-gray-400">Convenient payment option. Pay only when your order arrives at your doorstep.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-dark">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-semibold">
              Featured <span className="text-amber-500">Products</span>
            </h2>
            <Link href="/products" className="text-amber-500 hover:text-amber-400 flex items-center font-medium">
              View All <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-900/40 to-amber-700/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Get Your Favorite Drinks <span className="text-amber-500">Delivered Today</span>
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              From premium whiskies to craft beers, we&apos;ve got your drinking needs covered. Fast and reliable delivery across Kathmandu valley.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/products" className="btn-primary btn-lg">
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
