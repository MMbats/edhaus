import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import CustomerManagement from '../../components/admin/CustomerManagement';

const Customers = () => {
  return (
    <AdminLayout>
      <CustomerManagement />
    </AdminLayout>
  );
};

export default Customers;