'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Wine, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Prevent hydration mismatch by only rendering cart count after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    closeMenu();
    setShowUserMenu(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2"
          aria-label="Boozmandu - Home"
        >
          <Wine className="w-8 h-8 text-amber-500" />
          <h1 className="text-xl font-display font-bold text-white">
            <span className="text-amber-500">Booz</span>mandu
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={isActive('/') ? 'active-nav-link' : 'nav-link'}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={isActive('/products') ? 'active-nav-link' : 'nav-link'}
          >
            Products
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white font-medium transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="nav-link flex items-center"
            >
              <User className="w-5 h-5 mr-1" />
              <span className="hidden lg:inline">Login</span>
            </Link>
          )}

          <Link
            href="/cart"
            className="relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className={`w-6 h-6 ${pathname === '/cart' ? 'text-amber-500' : 'text-white'}`} />
            {mounted && getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link href="/cart" className="relative" aria-label="Shopping Cart">
            <ShoppingCart className="w-6 h-6 text-white" />
            {mounted && getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMenu}
            className="text-white p-1"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-dark z-40 md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                href="/"
                className={`text-xl py-2 px-4 ${isActive('/') ? 'text-amber-500 border-l-4 border-amber-500 pl-3' : 'text-white'}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`text-xl py-2 px-4 ${isActive('/products') ? 'text-amber-500 border-l-4 border-amber-500 pl-3' : 'text-white'}`}
                onClick={closeMenu}
              >
                Products
              </Link>

              {user ? (
                <div className="border-t border-gray-700 pt-4">
                  <div className="px-4 py-2">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="w-full text-left px-4 py-2 text-gray-300 hover:text-white flex items-center"
                    onClick={closeMenu}
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:text-white flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`text-xl py-2 px-4 ${isActive('/login') ? 'text-amber-500 border-l-4 border-amber-500 pl-3' : 'text-white'}`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
