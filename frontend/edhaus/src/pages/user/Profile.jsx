import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { UserIcon, HomeIcon, UserGroupIcon, BellIcon } from '@heroicons/react/24/outline';
import ProfileInfo from '../../components/profile/ProfileInfo';
import AddressBook from '../../components/profile/AddressBook';

const Profile = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      icon: UserIcon,
      label: 'Basic Information',
      path: '/profile',
      component: ProfileInfo
    },
    {
      icon: HomeIcon,
      label: 'Address Book',
      path: '/profile/address',
      component: AddressBook
    },
    {
      icon: UserGroupIcon,
      label: 'Refer a Friend',
      path: '/profile/refer'
    },
    {
      icon: BellIcon,
      label: 'Notification Preferences',
      path: '/profile/notifications'
    }
  ];

  // Find the current menu item based on path
  const currentMenuItem = menuItems.find(item => item.path === currentPath) || menuItems[0];
  const CurrentComponent = currentMenuItem.component || (() => (
    <div className="text-center py-12">
      <p className="text-gray-500">This feature is coming soon!</p>
    </div>
  ));

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li>
              <span className="text-gray-300 px-2">&gt;</span>
            </li>
            <li>
              <Link to="/profile" className="text-gray-500 hover:text-gray-700">Account</Link>
            </li>
            <li>
              <span className="text-gray-300 px-2">&gt;</span>
            </li>
            <li>
              <span className="text-orange-500">{currentMenuItem.label}</span>
            </li>
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
            <div className="bg-white rounded-lg shadow">
              <CurrentComponent />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;