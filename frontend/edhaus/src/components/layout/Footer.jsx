import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="!bg-[#0f172a] w-full">
      <footer className="!bg-[#0f172a] border-t border-gray-800" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-sm font-semibold text-orange-500 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/about" className="text-base text-gray-300 hover:text-orange-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-base text-gray-300 hover:text-orange-500">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-base text-gray-300 hover:text-orange-500">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-sm font-semibold text-orange-500 tracking-wider uppercase">
                Shop
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/products" className="text-base text-gray-300 hover:text-orange-500">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-base text-gray-300 hover:text-orange-500">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="text-base text-gray-300 hover:text-orange-500">
                    Deals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-sm font-semibold text-orange-500 tracking-wider uppercase">
                Account
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/profile" className="text-base text-gray-300 hover:text-orange-500">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-base text-gray-300 hover:text-orange-500">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="text-base text-gray-300 hover:text-orange-500">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-orange-500 tracking-wider uppercase">
                Contact Us
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="text-base text-gray-300">
                  123 Main Street<br />
                  Nairobi, Kenya
                </li>
                <li>
                  <a href="tel:+254700000000" className="text-base text-gray-300 hover:text-orange-500">
                    +254 700 000 000
                  </a>
                </li>
                <li>
                  <a href="mailto:info@edhaus.com" className="text-base text-gray-300 hover:text-orange-500">
                    info@edhaus.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} EdHaus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;