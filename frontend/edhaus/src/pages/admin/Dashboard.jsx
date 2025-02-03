import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Revenue',
    value: 'KES 150,000',
    icon: CurrencyDollarIcon,
    change: '+12.5%',
    changeType: 'positive',
  },
  {
    name: 'Total Orders',
    value: '256',
    icon: ShoppingCartIcon,
    change: '+8.2%',
    changeType: 'positive',
  },
  {
    name: 'Total Customers',
    value: '1,024',
    icon: UsersIcon,
    change: '+15.3%',
    changeType: 'positive',
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    icon: ChartBarIcon,
    change: '-2.1%',
    changeType: 'negative',
  },
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-primary-500 rounded-md p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 bg-white shadow rounded-lg">
            {/* Add your recent activity content here */}
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Sales Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
            {/* Add your sales chart here */}
          </div>

          {/* Orders Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Orders Overview</h3>
            {/* Add your orders chart here */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;