import { createContext, useContext, useState, useCallback } from 'react';
import { productService } from '../services/productService';
import { toast } from 'react-hot-toast';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all products with filters
  const fetchProducts = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching products with filters:', filters);
      const data = await productService.getProducts(filters);
      console.log('Products received:', data);
      setProducts(data.products || []);
      return data;
    } catch (err) {
      console.error('Error fetching products:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch products';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get products by category
  const fetchProductsByCategory = useCallback(async (categoryId, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching products by category:', categoryId, 'with filters:', filters);
      const data = await productService.getProductsByCategory(categoryId, filters);
      console.log('Products received:', data);
      setProducts(data.products || []);
      return data;
    } catch (err) {
      console.error('Error fetching category products:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch category products';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching categories');
      const data = await productService.getCategories();
      console.log('Categories received:', data);
      setCategories(data.categories || []);
      return data;
    } catch (err) {
      console.error('Error fetching categories:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch categories';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single product
  const fetchProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching product:', id);
      const data = await productService.getProduct(id);
      console.log('Product received:', data);
      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Admin: Create product
  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Creating product:', productData);
      const data = await productService.createProduct(productData);
      console.log('Product created:', data);
      toast.success('Product created successfully');
      return data;
    } catch (err) {
      console.error('Error creating product:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Admin: Update product
  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Updating product:', id, 'with data:', productData);
      const data = await productService.updateProduct(id, productData);
      console.log('Product updated:', data);
      toast.success('Product updated successfully');
      return data;
    } catch (err) {
      console.error('Error updating product:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Admin: Delete product
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Deleting product:', id);
      await productService.deleteProduct(id);
      console.log('Product deleted');
      toast.success('Product deleted successfully');
    } catch (err) {
      console.error('Error deleting product:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    fetchCategories,
    fetchProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
