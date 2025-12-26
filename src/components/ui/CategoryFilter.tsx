'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { getCategories } from '@/data/products';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  const categories = getCategories();

  return (
    <div className="overflow-x-auto pb-3 mb-6">
      <div className="flex space-x-2 min-w-max">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-amber-500 text-dark'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-amber-500 text-dark'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
