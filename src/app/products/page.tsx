'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import Pagination from '@/components/ui/Pagination';
import { Product } from '@/types';

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const filterProducts = useCallback((category: string, term: string) => {
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
  }, [products]);

  useEffect(() => {
    // Load products from database API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const allProducts = await response.json();
          setProducts(allProducts);
          setFilteredProducts(allProducts);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts(activeCategory, searchTerm);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeCategory, searchTerm, filterProducts]);

  useEffect(() => {
    // Update displayed products based on current page
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startProduct = (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endProduct = Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length);

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

        {/* Results Summary */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 text-sm text-gray-400">
            <p>
              Showing {startProduct}-{endProduct} of {filteredProducts.length} products
            </p>
            {totalPages > 1 && (
              <p className="mt-2 sm:mt-0">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => (
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
              <>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={currentPage} // Force re-animation when page changes
                >
                  {displayedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
