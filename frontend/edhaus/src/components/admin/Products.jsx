import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import ProductManagement from '../../components/admin/ProductManagement';

const Products = () => {
  return (
    <AdminLayout>
      <ProductManagement />
    </AdminLayout>
  );
};

export default Products;