'use client'

import React from 'react';
import { X } from 'lucide-react';
import { Product } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return `NPR ${price.toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-800 rounded-lg w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white z-10 bg-gray-800 bg-opacity-50 rounded-full p-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="h-48 sm:h-56 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-60"></div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                      <p className="text-amber-500 text-lg font-semibold">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    {product.featured && (
                      <span className="bg-amber-500 text-dark px-2 py-1 text-xs font-bold rounded flex-shrink-0">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-700 p-2 rounded">
                      <p className="text-xs text-gray-400">Category</p>
                      <p className="text-sm font-medium">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <p className="text-xs text-gray-400">Origin</p>
                      <p className="text-sm font-medium">{product.origin}</p>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <p className="text-xs text-gray-400">Volume</p>
                      <p className="text-sm font-medium">{product.volume}</p>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <p className="text-xs text-gray-400">Alcohol Content</p>
                      <p className="text-sm font-medium">{product.alcoholPercentage}%</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-base font-semibold mb-2">Description</h4>
                    <p className="text-sm text-gray-300">{product.description}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-700 pt-3">
                    <p>
                      {product.inStock ? (
                        <span className="text-green-500">● In Stock</span>
                      ) : (
                        <span className="text-red-500">● Out of Stock</span>
                      )}
                    </p>
                    <p>ID: {product.id}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
