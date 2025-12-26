'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Info } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const hasVariants = Array.isArray(product.variants) && (product.variants?.length ?? 0) > 0;
  const variant = hasVariants ? product.variants?.[selectedVariantIndex] : null;

  const displayPrice = hasVariants ? variant!.price : product.price;
  const displayVolume = hasVariants ? variant!.volume : product.volume;
  const displayImage = hasVariants && variant!.image ? variant!.image : product.image;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Trigger a short vibration on supported mobile devices *immediately* within the user gesture
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(100);
    }

    if (hasVariants) {
      addToCart({ ...product, ...variant });
    } else {
      addToCart(product);
    }
  };

  const formatPrice = (price: number) => {
    return `NPR ${price.toLocaleString()}`;
  };

  return (
    <>
      <motion.div
        className="product-card group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div className="relative overflow-hidden h-48 md:h-56">
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-amber-500 text-dark px-2 py-1 text-xs font-bold rounded">
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent opacity-60"></div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
            <div className="text-amber-500 font-semibold">
              {formatPrice(displayPrice)}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
            <span>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
            <span>{displayVolume}{product.alcoholPercentage !== undefined ? ` | ${product.alcoholPercentage}%` : ''}</span>
          </div>

          {hasVariants && (
            <div className="mb-3">
              <select
                className="w-full bg-gray-800 text-white p-2 rounded"
                value={selectedVariantIndex}
                onChange={e => setSelectedVariantIndex(Number(e.target.value))}
              >
                {(product.variants ?? []).map((v, idx) => (
                  <option key={v.id} value={idx}>{v.volume} - {formatPrice(v.price)}</option>
                ))}
              </select>
            </div>
          )}

          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.description}</p>

          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-dark py-2 px-4 rounded-md flex items-center justify-center font-medium transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-4 h-4 mr-1" /> Add to Cart
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-md transition-colors"
              aria-label={`View ${product.name} details`}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
