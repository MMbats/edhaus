import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const CartSummary = () => {
  const navigate = useNavigate();
  const { state } = useCart();

  const calculateSubtotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalWeight = () => {
    return state.items.reduce((total, item) => total + (item.weight * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    const totalWeight = calculateTotalWeight();
    
    // Free shipping for orders over 50,000 KES
    if (subtotal >= 50000) return 0;
    
    // Base shipping rate
    let shippingCost = 500;
    
    // Additional cost for heavy items (weight in kg)
    if (totalWeight > 1000) {
      shippingCost += 2000; // Extra cost for very heavy orders (>1000kg)
    } else if (totalWeight > 500) {
      shippingCost += 1000; // Extra cost for heavy orders (>500kg)
    } else if (totalWeight > 100) {
      shippingCost += 500; // Extra cost for moderately heavy orders (>100kg)
    }
    
    return shippingCost;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const getEstimatedDelivery = () => {
    const totalWeight = calculateTotalWeight();
    
    if (totalWeight > 1000) {
      return '3-5 business days';
    } else if (totalWeight > 500) {
      return '2-4 business days';
    } else if (totalWeight > 100) {
      return '1-3 business days';
    }
    return '1-2 business days';
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">KES {calculateSubtotal().toLocaleString()}</span>
        </div>
        
        {/* Show total weight */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Total Weight</span>
          <span>{calculateTotalWeight().toLocaleString()} kg</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {calculateShipping() === 0 ? (
            <span className="text-green-500">Free</span>
          ) : (
            <span className="text-gray-900">KES {calculateShipping().toLocaleString()}</span>
          )}
        </div>

        {calculateSubtotal() < 50000 && (
          <div className="text-sm text-gray-500">
            Add KES {(50000 - calculateSubtotal()).toLocaleString()} more for free shipping
          </div>
        )}
        
        {/* Estimated delivery time */}
        <div className="text-sm text-gray-600">
          Estimated Delivery: {getEstimatedDelivery()}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-lg font-medium text-gray-900">
              KES {calculateTotal().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        disabled={state.items.length === 0}
        className={`w-full mt-6 py-3 px-4 rounded-md text-white 
          ${state.items.length === 0 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-primary-500 hover:bg-primary-600'}`}
      >
        Proceed to Checkout
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <p>We accept:</p>
        <div className="flex items-center space-x-2 mt-2">
          <img src="/images/products/mpesa-logo.png" alt="M-Pesa" className="h-6" />
          <img src="/images/products/visa-logo.png" alt="Visa" className="h-6" />
          <img src="/images/products/mastercard-logo.png" alt="Mastercard" className="h-6" />
        </div>
      </div>

      {/* Additional information */}
      <div className="mt-4 text-sm text-gray-500 space-y-2">
        <p>• Free delivery for orders above KES 50,000</p>
        <p>• Additional shipping fees may apply for heavy items</p>
        <p>• Bulk discounts available for large orders</p>
        <p>• All prices include VAT</p>
      </div>
    </div>
  );
};

export default CartSummary;