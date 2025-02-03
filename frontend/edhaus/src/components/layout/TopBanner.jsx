import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const TopBanner = () => {
  const { user } = useAuth();

  if (user) return null; // Don't show banner to logged-in users

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-x-6">
            <p className="text-sm leading-6 text-white">
              Stronger Foundations, Better Builds
            </p>
          </div>
          <div className="flex flex-none">
            <Link
              to="/register"
              className="flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Sign up <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
