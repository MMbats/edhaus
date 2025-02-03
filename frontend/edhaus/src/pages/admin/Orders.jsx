import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import OrderManagement from '../../components/admin/OrderManagement';

const Orders = () => {
  return (
    <AdminLayout>
      <OrderManagement />
    </AdminLayout>
  );
};

export default Orders;