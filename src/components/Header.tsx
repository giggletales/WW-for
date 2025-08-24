import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const headerRef = useScrollAnimation((isVisible) => {
    setIsScrolled(!isVisible);
  }, { threshold: 0.9, triggerOnce: false });

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <div ref={headerRef as any} className="h-16"></div>
      <header className={`nav-3d fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <TrendingUp className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors float-animation" />
                <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors text-glow">
                TraderEdge Pro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`nav-item-3d font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                className={`nav-item-3d font-medium transition-colors ${
                  isActive('/features') 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Features
              </Link>
              <Link 
                to="/about" 
                className={`nav-item-3d font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                About
              </Link>
              <Link 
                to="/faq" 
                className={`nav-item-3d font-medium transition-colors ${
                  isActive('/faq') 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                FAQ
              </Link>
              <Link 
                to="/membership" 
                className={`nav-item-3d font-medium transition-colors ${
                  isActive('/membership') 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Pricing
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/signin"
                className="nav-item-3d text-gray-300 hover:text-blue-400 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn-3d bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors p-2 interactive-element"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 rounded-b-lg modal-3d open">
                <Link 
                  to="/" 
                  className={`nav-item-3d block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-blue-400 bg-blue-600/20' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/membership" 
                  className={`nav-item-3d block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/membership') 
                      ? 'text-blue-400 bg-blue-600/20' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  to="/features" 
                  className={`nav-item-3d block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/features') 
                      ? 'text-blue-400 bg-blue-600/20' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/about" 
                  className={`nav-item-3d block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/about') 
                      ? 'text-blue-400 bg-blue-600/20' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/faq" 
                  className={`nav-item-3d block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/faq') 
                      ? 'text-blue-400 bg-blue-600/20' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="pt-4 border-t border-gray-700">
                  <Link
                    to="/signin"
                    className="nav-item-3d block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-item-3d block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;