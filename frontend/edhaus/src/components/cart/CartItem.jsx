import React from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-hot-toast';

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    
    // Check if new quantity exceeds available stock
    if (newQuantity > item.stock) {
      toast.error(`Only ${item.stock} units available`);
      return;
    }

    // Apply bulk discount if applicable
    let updatedPrice = item.basePrice;
    if (newQuantity >= 100) {
      updatedPrice = item.basePrice * 0.85; // 15% discount for 100+ units
    } else if (newQuantity >= 50) {
      updatedPrice = item.basePrice * 0.90; // 10% discount for 50+ units
    } else if (newQuantity >= 20) {
      updatedPrice = item.basePrice * 0.95; // 5% discount for 20+ units
    }

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        id: item.id,
        quantity: newQuantity,
        price: updatedPrice
      }
    });
  };

  const removeItem = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: item.id
    });
    toast.success('Item removed from cart');
  };

  // Calculate bulk discount if any
  const getBulkDiscount = () => {
    if (item.quantity >= 100) return '15%';
    if (item.quantity >= 50) return '10%';
    if (item.quantity >= 20) return '5%';
    return null;
  };

  return (
    <div className="flex items-center py-6 border-b">
      <div className="flex-shrink-0 w-24 h-24">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <Link 
              to={`/products/${item.id}`}
              className="text-lg font-medium text-gray-900 hover:text-primary-500"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
            {/* Show stock status */}
            <p className={`mt-1 text-sm ${item.stock > 20 ? 'text-green-600' : 'text-orange-600'}`}>
              {item.stock > 20 ? 'In Stock' : `Only ${item.stock} units left`}
            </p>
          </div>
          <button
            onClick={removeItem}
            className="text-gray-400 hover:text-red-500"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(item.quantity - 1)}
              className="p-2 hover:bg-gray-50"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 border-x">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.quantity + 1)}
              className="p-2 hover:bg-gray-50"
              disabled={item.quantity >= item.stock}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              KES {(item.price * item.quantity).toLocaleString()}
            </p>
            {item.quantity > 1 && (
              <p className="text-sm text-gray-500">
                KES {item.price.toLocaleString()} each
              </p>
            )}
            {/* Show bulk discount if applicable */}
            {getBulkDiscount() && (
              <p className="text-sm text-green-600">
                {getBulkDiscount()} bulk discount applied
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;