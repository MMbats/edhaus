import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserIcon, HomeIcon, UserGroupIcon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  const menuItems = [
    {
      icon: UserIcon,
      label: 'Basic Information',
      path: '/profile',
    },
    {
      icon: HomeIcon,
      label: 'Address Book',
      path: '/profile/address',
    },
    {
      icon: UserGroupIcon,
      label: 'Refer a Friend',
      path: '/profile/refer',
    },
    {
      icon: BellIcon,
      label: 'Notification Preferences',
      path: '/profile/notifications',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center text-gray-500">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <svg
              className="fill-current w-3 h-3 mx-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
          <li className="flex items-center text-gray-500">
            <Link to="/profile" className="text-gray-500 hover:text-gray-700">
              Account
            </Link>
            <svg
              className="fill-current w-3 h-3 mx-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
          <li className="text-orange-500">Basic Information</li>
        </ol>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-lg shadow p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">Basic Information</h1>

              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-semibold">
                  {initials}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={user?.name || ''}
                      readOnly
                      className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      +254
                    </span>
                    <input
                      type="tel"
                      value={user?.phone || ''}
                      readOnly
                      className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-none rounded-r-md bg-gray-50"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1">
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
