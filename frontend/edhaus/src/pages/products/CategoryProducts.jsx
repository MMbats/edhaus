import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const { categories, products, loading, error, fetchProducts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    manufacturer: []
  });

  useEffect(() => {
    if (categoryId) {
      fetchProducts({ category_id: categoryId });
    }
  }, [categoryId, fetchProducts]);

  // Find the current category
  useEffect(() => {
    if (categories) {
      for (const mainCat of categories) {
        const subcat = mainCat.subcategories.find(sub => sub.id === parseInt(categoryId));
        if (subcat) {
          setSelectedCategory({ main: mainCat, sub: subcat });
          break;
        }
      }
    }
  }, [categories, categoryId]);

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
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-gray-600">Home</Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
            </svg>
          </li>
          <li className="flex items-center">
            <Link to="/products" className="text-gray-600">Products</Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
            </svg>
          </li>
          {selectedCategory && (
            <>
              <li className="flex items-center">
                <Link to={`/category/${selectedCategory.main.id}`} className="text-gray-600">
                  {selectedCategory.main.name}
                </Link>
                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                </svg>
              </li>
              <li>
                <span className="text-gray-800">{selectedCategory.sub.name}</span>
              </li>
            </>
          )}
        </ol>
      </nav>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">Filter values</h2>
          
          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center justify-between">
              Brand
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={(e) => {
                    const value = "EdHaus";
                    setFilters(prev => ({
                      ...prev,
                      brand: e.target.checked 
                        ? [...prev.brand, value]
                        : prev.brand.filter(b => b !== value)
                    }));
                  }}
                />
                <span className="ml-2">EdHaus</span>
              </label>
            </div>
          </div>

          {/* Manufacturer Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center justify-between">
              Manufacturer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={(e) => {
                    const value = "EdHaus";
                    setFilters(prev => ({
                      ...prev,
                      manufacturer: e.target.checked 
                        ? [...prev.manufacturer, value]
                        : prev.manufacturer.filter(m => m !== value)
                    }));
                  }}
                />
                <span className="ml-2">EdHaus</span>
              </label>
            </div>
          </div>

          <button 
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            onClick={() => fetchProducts({ category_id: categoryId, ...filters })}
          >
            Apply filters
          </button>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <img
                    src={product.image_url || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">From KES {product.price.toLocaleString()}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="block text-center text-orange-500 border border-orange-500 rounded-lg py-2 px-4 hover:bg-orange-50 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
