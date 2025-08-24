import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import HolographicText from './3D/HolographicText';
import '../styles/3d-animations.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/about', label: 'About' },
    { path: '/faq', label: 'FAQ' },
    { path: '/membership', label: 'Plans' }
  ];

  return (
    <>
      <div ref={headerRef as any} className="h-16"></div>
      <header className={`nav-3d fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group interactive-element">
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
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item-3d font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className={`nav-item-3d font-medium transition-colors ${
                      isActive('/dashboard')
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300">Welcome, {user.name}</span>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors p-2 interactive-element"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 rounded-b-lg modal-3d open">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`nav-item-3d block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-400 bg-blue-400/10'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className={`nav-item-3d block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive('/dashboard')
                          ? 'text-blue-400 bg-blue-400/10'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <div className="px-3 py-2 text-gray-400 text-sm">
                      Welcome, {user.name}
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="nav-item-3d block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="nav-item-3d block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;