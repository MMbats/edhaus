import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useSearchParams } from 'react-router-dom';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories
  } = useProducts();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category_id: searchParams.get('category') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    sort_by: searchParams.get('sort_by') || 'created_at',
    sort_order: searchParams.get('sort_order') || 'desc',
    page: parseInt(searchParams.get('page')) || 1
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts(filters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  }, [filters, fetchProducts, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search products..."
              className="flex-1 rounded-lg border-gray-300"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              name="category_id"
              value={filters.category_id}
              onChange={handleFilterChange}
              className="rounded-lg border-gray-300"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <optgroup key={category.id} label={category.name}>
                  {category.subcategories.map(sub => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <input
              type="number"
              name="min_price"
              value={filters.min_price}
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="rounded-lg border-gray-300"
            />

            <input
              type="number"
              name="max_price"
              value={filters.max_price}
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="rounded-lg border-gray-300"
            />

            <select
              name="sort_by"
              value={filters.sort_by}
              onChange={handleFilterChange}
              className="rounded-lg border-gray-300"
            >
              <option value="created_at">Latest</option>
              <option value="price">Price</option>
            </select>

            <select
              name="sort_order"
              value={filters.sort_order}
              onChange={handleFilterChange}
              className="rounded-lg border-gray-300"
            >
              <option value="desc">High to Low</option>
              <option value="asc">Low to High</option>
            </select>
          </div>
        </form>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">
                    KES {product.price.toLocaleString()}
                  </span>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => {/* Add to cart function */}}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
