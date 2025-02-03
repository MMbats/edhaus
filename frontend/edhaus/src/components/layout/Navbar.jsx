import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <>
      {/* Main navbar */}
      <div className="bg-[#1e293b] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Navigation */}
            <div className="flex items-center space-x-8">
              <button className="text-white hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors duration-300">
                All Categories
              </button>
              <Link
                to="/products"
                className="text-white hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Products
              </Link>
              <Link
                to="/faq"
                className="text-white hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                FAQ
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              <Link
                to="/cart"
                className="text-white hover:text-orange-400 transition-colors duration-300 relative"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link
                to="/login"
                className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors duration-300"
              >
                <User className="h-6 w-6" />
                <span className="text-sm font-medium hidden sm:block">Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;