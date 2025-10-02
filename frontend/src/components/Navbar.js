import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Users, BookOpen, Calendar, Settings } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50" data-id="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" data-id="navbar-logo">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">AlumniConnect</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              data-id="nav-home"
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              data-id="nav-dashboard"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <Link 
              to="/alumni" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              data-id="nav-alumni"
            >
              <Users className="h-4 w-4 mr-1" />
              Alumni
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                data-id="nav-login"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                data-id="nav-register"
              >
                Join Now
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              data-id="mobile-menu-toggle"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" data-id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
              data-id="mobile-nav-home"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              onClick={() => setIsOpen(false)}
              data-id="mobile-nav-dashboard"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/alumni"
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              onClick={() => setIsOpen(false)}
              data-id="mobile-nav-alumni"
            >
              <Users className="h-4 w-4 mr-2" />
              Alumni
            </Link>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
                data-id="mobile-nav-login"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium mt-2"
                onClick={() => setIsOpen(false)}
                data-id="mobile-nav-register"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;