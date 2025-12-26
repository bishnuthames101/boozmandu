'use client'

import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darker pt-12 border-t border-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-4 text-amber-500">
              Boozmandu
            </h3>
            <p className="text-gray-400 mb-4">
              Nepal&apos;s premier online liquor delivery service. We bring the finest spirits, wines, and beers directly to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400 hover:text-amber-500 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-4 text-amber-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amber-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-4 text-amber-500">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">Durbar Marg, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-400">+977 1 4XXXXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-400">info@boozmandu.com</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700 text-sm text-gray-400">
              <p>
                <strong>Delivery Hours:</strong> 11:00 AM - 9:00 PM, 7 days a week
              </p>
              <p className="mt-2">
                <strong>Note:</strong> We do not sell to persons under the legal drinking age of 21. Valid ID proof may be required upon delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Boozmandu. All rights reserved.
            </p>
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-amber-500 text-xs flex items-center gap-1 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin
            </Link>
          </div>
          <p className="text-gray-500 text-sm text-center md:text-right">
            Drink responsibly. Not for sale to persons under 21 years of age.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
