import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { state, dispatch } = useCart();

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">
            Start shopping to add items to your cart
          </p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-500"
            >
              Clear Cart
            </button>
          </div>

          <div className="mt-8">
            {state.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/products"
              className="text-primary-500 hover:text-primary-600"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:mt-0 lg:col-span-5">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;