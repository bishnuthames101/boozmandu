import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import CategoryFilter from '../components/ui/CategoryFilter';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const allProducts = getProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    filterProducts(activeCategory, searchTerm);
  }, [activeCategory, searchTerm, products]);

  const filterProducts = (category: string, term: string) => {
    let filtered = [...products];

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search term
    if (term.trim() !== '') {
      const searchLower = term.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="py-16 pt-32">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-display font-semibold mb-4 md:mb-0">
            Our <span className="text-amber-500">Collection</span>
          </h1>

          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="input"
            />
          </div>
        </div>

        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg h-96 animate-pulse">
                <div className="h-48 bg-gray-700 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-10 bg-gray-700 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">
                  No products found matching your criteria.
                </p>
                <button 
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 text-amber-500 hover:text-amber-400"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;