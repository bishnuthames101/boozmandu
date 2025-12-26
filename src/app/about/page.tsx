'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Wine, Clock, Shield, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 pt-32">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-semibold mb-6">
            About <span className="text-amber-500">Boozmandu</span>
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Founded in 2023, Boozmandu is Nepal&apos;s premier online liquor delivery service,
              bringing premium spirits, wines, and beers directly to your doorstep in Kathmandu Valley.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Wine className="text-amber-500 w-6 h-6 mr-2" />
                  Our Mission
                </h3>
                <p className="text-gray-300">
                  To provide convenient, reliable, and responsible access to premium alcoholic beverages
                  while promoting safe drinking practices in our community.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Shield className="text-amber-500 w-6 h-6 mr-2" />
                  Our Values
                </h3>
                <p className="text-gray-300">
                  We prioritize customer satisfaction, product authenticity, and responsible service
                  while maintaining the highest standards of business ethics.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-display font-semibold mb-4">Why Choose Boozmandu?</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-gray-300">
                    We understand the importance of timely delivery. Our dedicated team ensures
                    your orders reach you within 60 minutes in the Kathmandu Valley area.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Shield className="w-6 h-6 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Genuine Products</h3>
                  <p className="text-gray-300">
                    All our products are sourced directly from authorized distributors and importers,
                    ensuring 100% authenticity and quality.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Truck className="w-6 h-6 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Convenient Payment</h3>
                  <p className="text-gray-300">
                    We offer cash on delivery for your convenience, allowing you to pay only when
                    your order arrives at your doorstep.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-display font-semibold mb-4">Our Commitment</h2>
            <p className="text-gray-300 mb-6">
              At Boozmandu, we are committed to responsible service. We strictly adhere to legal
              drinking age requirements and promote responsible consumption. Our team is trained
              to verify age and identity upon delivery to ensure compliance with local regulations.
            </p>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-8">
              <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
              <p className="text-gray-300">
                Location: Durbar Marg, Kathmandu, Nepal<br />
                Phone: +977 1 4XXXXXX<br />
                Email: info@boozmandu.com<br />
                Operating Hours: 11:00 AM - 9:00 PM (7 days a week)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
