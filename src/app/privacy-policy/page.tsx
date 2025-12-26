'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 pt-32">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-semibold mb-6 flex items-center">
            <Shield className="text-amber-500 w-8 h-8 mr-3" />
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last updated: March 15, 2024
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-gray-300">
                  Boozmandu (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to
                  protecting your personal information. This Privacy Policy explains how we collect,
                  use, and safeguard your information when you use our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="text-gray-300 mb-4">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Name and contact information (phone number, delivery address)</li>
                  <li>Order history and preferences</li>
                  <li>Delivery instructions and notes</li>
                  <li>Age verification information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-gray-300 mb-4">We use the collected information to:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Process and deliver your orders</li>
                  <li>Communicate with you about your orders</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraudulent transactions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information Security</h2>
                <p className="text-gray-300">
                  We implement appropriate security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. However,
                  no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
                <p className="text-gray-300">
                  We retain your personal information for as long as necessary to fulfill the
                  purposes outlined in this Privacy Policy, unless a longer retention period is
                  required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-gray-300 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at:<br />
                  Email: privacy@boozmandu.com<br />
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
