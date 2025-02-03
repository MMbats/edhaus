import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

const categoryColors = {
  'BUILDING MATERIALS': 'bg-navy-900',
  'FINISHING MATERIALS': 'bg-blue-600',
  'ADHESIVES AND SEALANTS': 'bg-orange-500',
  'HARDWARE & TOOLS': 'bg-pink-100'
};

const Products = () => {
  const { products, categories, loading, error, fetchProducts, fetchCategories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    min_price: "",
    max_price: "",
    sort_by: "created_at",
    sort_order: "desc"
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-navy-900 text-white rounded-lg p-8 mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore all our products</h1>
        <p className="text-xl">Search effortlessly by categories and brands to find exactly what you are looking for.</p>
      </div>

      {/* Products by Category Section */}
      <h2 className="text-3xl font-bold mb-8">Products by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={`${categoryColors[category.name] || 'bg-gray-100'} p-6 rounded-lg`}
          >
            <h3 className="text-xl font-bold mb-4 text-white">{category.name}</h3>
            <div className="space-y-2">
              {category.subcategories.map((subcat) => (
                <Link
                  key={subcat.id}
                  to={`/category/${subcat.id}`}
                  className="block bg-white bg-opacity-20 text-white rounded-full px-4 py-2 hover:bg-opacity-30 transition-all"
                >
                  {subcat.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search products..."
          className="rounded-lg border-gray-300"
        />
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
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
    </div>
  );
};

export default Products;
