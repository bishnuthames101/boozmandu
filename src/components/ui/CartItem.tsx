'use client'

import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const formatPrice = (price: number) => {
    return `NPR ${price.toLocaleString()}`;
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-700 rounded overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-white font-medium">{product.name}</h3>
        <p className="text-sm text-gray-400">
          {product.volume} | {product.alcoholPercentage}%
        </p>
        <p className="text-amber-500 font-semibold mt-1">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <div className="flex items-center">
          <button
            onClick={handleDecrease}
            className="p-1 text-gray-400 hover:text-white"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="w-8 text-center text-white">{quantity}</span>

          <button
            onClick={handleIncrease}
            className="p-1 text-gray-400 hover:text-white"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-400 flex items-center text-sm"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
