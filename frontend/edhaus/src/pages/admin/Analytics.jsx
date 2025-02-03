import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';

const Analytics = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sales Overview */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Sales Overview</h2>
            <div className="text-3xl font-bold text-orange-600">$24,500</div>
            <p className="text-gray-500">Total Sales This Month</p>
          </div>

          {/* Orders */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Orders</h2>
            <div className="text-3xl font-bold text-orange-600">156</div>
            <p className="text-gray-500">Total Orders This Month</p>
          </div>

          {/* Customers */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Customers</h2>
            <div className="text-3xl font-bold text-orange-600">89</div>
            <p className="text-gray-500">New Customers This Month</p>
          </div>

          {/* Products */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Products</h2>
            <div className="text-3xl font-bold text-orange-600">245</div>
            <p className="text-gray-500">Total Active Products</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Sales Trend</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">Sales Chart Coming Soon</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Popular Categories</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">Categories Chart Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Order #1234</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <span className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                  Completed
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Customer Registration</p>
                  <p className="text-sm text-gray-500">3 hours ago</p>
                </div>
                <span className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
                  New
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Product Stock Update</p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                </div>
                <span className="px-3 py-1 text-sm text-yellow-800 bg-yellow-100 rounded-full">
                  Updated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
