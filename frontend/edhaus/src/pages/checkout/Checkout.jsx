import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import ShippingForm from '../../components/checkout/ShippingForm';
import PaymentForm from '../../components/checkout/PaymentForm';
import api from '../../services/api';

const steps = [
  { id: 'shipping', name: 'Shipping Information' },
  { id: 'payment', name: 'Payment Method' },
  { id: 'review', name: 'Review Order' }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { state: cartState, dispatch } = useCart();
  const [currentStep, setCurrentStep] = useState('shipping');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    county: '',
    address: '',
    instructions: '',
    paymentMethod: 'mpesa',
    mpesaPhone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [errors, setErrors] = useState({});

  const validateShippingForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.county) newErrors.county = 'County is required';
    if (!formData.address) newErrors.address = 'Delivery address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    if (formData.paymentMethod === 'mpesa') {
      if (!formData.mpesaPhone) newErrors.mpesaPhone = 'M-Pesa phone number is required';
    } else if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 'shipping' && validateShippingForm()) {
      setCurrentStep('payment');
    } else if (currentStep === 'payment' && validatePaymentForm()) {
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'payment') setCurrentStep('shipping');
    if (currentStep === 'review') setCurrentStep('payment');
  };

  const calculateTotal = () => {
    const subtotal = cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 10000 ? 0 : 500;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping
    };
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.createOrder({
        items: cartState.items,
        shipping: {
          fullName: formData.fullName,
          phone: formData.phone,
          county: formData.county,
          address: formData.address,
          instructions: formData.instructions
        },
        payment: {
          method: formData.paymentMethod,
          details: formData.paymentMethod === 'mpesa' 
            ? { phone: formData.mpesaPhone }
            : { 
                cardNumber: formData.cardNumber,
                expiry: formData.cardExpiry,
                cvv: formData.cardCvv
              }
        },
        totals: calculateTotal()
      });

      // Clear cart after successful order
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirect to order confirmation
      navigate(`/orders/${response.data.orderId}`);
    } catch (error) {
      setError('Failed to place order. Please try again.');
      console.error('Order placement failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Steps */}
      <nav aria-label="Progress" className="mb-12">
        <ol className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li
              key={step.id}
              className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}
            >
              <div className="flex items-center">
                <div
                  className={`${
                    step.id === currentStep
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  } rounded-full border-2 flex items-center justify-center h-8 w-8 text-sm font-medium`}
                >
                  {stepIdx + 1}
                </div>
                <div className="ml-4 hidden sm:block">
                  <p
                    className={`${
                      step.id === currentStep ? 'text-primary-500' : 'text-gray-500'
                    } text-sm font-medium`}
                  >
                    {step.name}
                  </p>
                </div>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div className="hidden sm:block absolute top-4 right-0 w-full">
                  <div className="h-0.5 bg-gray-200" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <div className="bg-white shadow rounded-lg p-6">
            {currentStep === 'shipping' && (
              <ShippingForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            )}

            {currentStep === 'payment' && (
              <PaymentForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            )}

            {currentStep === 'review' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Order Review</h2>
                {/* Display order summary and confirmation */}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {currentStep !== 'shipping' && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm font-medium text-primary-500 hover:text-primary-600"
                >
                  Back
                </button>
              )}
              {currentStep !== 'review' ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="ml-auto bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {cartState.items.map((item) => (
                  <li key={item.id} className="flex items-center py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  KES {calculateTotal().subtotal.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">
                  {calculateTotal().shipping === 0 
                    ? 'Free' 
                    : `KES ${calculateTotal().shipping.toLocaleString()}`}
                </p>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">
                    KES {calculateTotal().total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;