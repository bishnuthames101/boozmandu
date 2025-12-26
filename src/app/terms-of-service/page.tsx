'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="py-16 pt-32">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-semibold mb-6 flex items-center">
            <ScrollText className="text-amber-500 w-8 h-8 mr-3" />
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last updated: March 15, 2024
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300">
                  By accessing and using Boozmandu&apos;s website and services, you agree to be bound
                  by these Terms of Service. If you disagree with any part of these terms, you
                  may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Age Restrictions</h2>
                <p className="text-gray-300">
                  You must be at least 21 years old to use our services. By placing an order,
                  you confirm that you and the recipient (if different) are of legal drinking age.
                  Valid identification will be required upon delivery.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Ordering and Delivery</h2>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Orders are subject to product availability</li>
                  <li>Delivery is available only within Kathmandu Valley</li>
                  <li>Delivery hours: 11:00 AM - 9:00 PM, 7 days a week</li>
                  <li>Cash on delivery is the only accepted payment method</li>
                  <li>We reserve the right to refuse service to visibly intoxicated persons</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Product Information</h2>
                <p className="text-gray-300">
                  While we strive to display accurate product information, we do not warrant that
                  product descriptions, prices, or other content are accurate, complete, reliable,
                  current, or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Pricing and Payment</h2>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>All prices are in Nepalese Rupees (NPR)</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Delivery fees may apply</li>
                  <li>Payment is accepted only in cash upon delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Cancellation Policy</h2>
                <p className="text-gray-300">
                  Orders can be cancelled before the delivery process begins. Once a delivery is
                  in progress, cancellation may not be possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Responsible Service</h2>
                <p className="text-gray-300">
                  We promote responsible drinking and reserve the right to refuse service to anyone
                  who appears to be intoxicated or unable to provide valid identification.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-300">
                  Boozmandu shall not be liable for any indirect, incidental, special, consequential,
                  or punitive damages resulting from your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                <p className="text-gray-300">
                  We reserve the right to modify these terms at any time. Changes will be effective
                  immediately upon posting on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                <p className="text-gray-300">
                  For questions about these Terms of Service, please contact us at:<br />
                  Email: legal@boozmandu.com<br />
                  Phone: +977 1 4XXXXXX
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
