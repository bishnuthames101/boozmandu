import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Wine } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
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
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active-nav-link' : 'nav-link'}
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? 'active-nav-link' : 'nav-link'}
          >
            Products
          </NavLink>
          <NavLink 
            to="/cart" 
            className="relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className={`w-6 h-6 ${location.pathname === '/cart' ? 'text-amber-500' : 'text-white'}`} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link to="/cart" className="relative" aria-label="Shopping Cart">
            <ShoppingCart className="w-6 h-6 text-white" />
            {getCartCount() > 0 && (
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
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-xl py-2 px-4 ${isActive ? 'text-amber-500 border-l-4 border-amber-500 pl-3' : 'text-white'}`
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `text-xl py-2 px-4 ${isActive ? 'text-amber-500 border-l-4 border-amber-500 pl-3' : 'text-white'}`
                }
                onClick={closeMenu}
              >
                Products
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;