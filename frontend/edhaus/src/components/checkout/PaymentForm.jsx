import React from 'react';
import { RadioGroup } from '@headlessui/react';

const PaymentForm = ({ formData, setFormData, errors }) => {
  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Pay via M-Pesa mobile money',
      icon: '/images/products/mpesa-logo.png'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with Visa or Mastercard',
      icon: '/images/products/card-logos.png'
    }
  ];

  return (
    <div className="space-y-6">
      <RadioGroup value={formData.paymentMethod} onChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
        <RadioGroup.Label className="text-lg font-medium text-gray-900">
          Select Payment Method
        </RadioGroup.Label>

        <div className="mt-4 space-y-4">
          {paymentMethods.map((method) => (
            <RadioGroup.Option
              key={method.id}
              value={method.id}
              className={({ checked }) =>
                `${
                  checked ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-300'
                } relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className="font-medium text-gray-900"
                        >
                          {method.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="text-gray-500"
                        >
                          {method.description}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    <img
                      src={method.icon}
                      alt={method.name}
                      className="h-8 w-auto"
                    />
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {formData.paymentMethod === 'mpesa' && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            M-Pesa Phone Number
          </label>
          <input
            type="tel"
            value={formData.mpesaPhone}
            onChange={(e) => setFormData({ ...formData, mpesaPhone: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="e.g., 254712345678"
          />
          {errors.mpesaPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.mpesaPhone}</p>
          )}
        </div>
      )}

      {formData.paymentMethod === 'card' && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                value={formData.cardExpiry}
                onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="MM/YY"
              />
              {errors.cardExpiry && (
                <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                value={formData.cardCvv}
                onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="123"
              />
              {errors.cardCvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cardCvv}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;