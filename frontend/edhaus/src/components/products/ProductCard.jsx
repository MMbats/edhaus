import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        quantity: 1
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-500">
              KES {product.price.toLocaleString()}
            </span>
            <button
              onClick={addToCart}
              className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;