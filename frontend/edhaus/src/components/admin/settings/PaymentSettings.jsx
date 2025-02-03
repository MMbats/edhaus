import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    mpesa: {
      enabled: true,
      businessShortCode: '',
      environment: 'sandbox'
    },
    bankTransfer: {
      enabled: true,
      accountName: 'EdHaus Construction',
      accountNumber: '',
      bankName: '',
      branchName: ''
    },
    cashOnDelivery: {
      enabled: true,
      minimumOrder: '10000',
      maximumOrder: '100000'
    },
    defaultCurrency: 'KES',
    minimumOrder: '5000'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [method, field] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [method]: {
          ...prev[method],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save payment settings
      toast.success('Payment settings saved successfully');
    } catch (error) {
      toast.error('Failed to save payment settings');
      console.error('Error saving payment settings:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* M-Pesa Configuration */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">M-Pesa Configuration</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="mpesa.enabled"
                checked={settings.mpesa.enabled}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable M-Pesa</span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="mpesa.businessShortCode" className="block text-sm font-medium text-gray-700">
                Business Short Code
              </label>
              <input
                type="text"
                name="mpesa.businessShortCode"
                id="mpesa.businessShortCode"
                value={settings.mpesa.businessShortCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="mpesa.environment" className="block text-sm font-medium text-gray-700">
                Environment
              </label>
              <select
                name="mpesa.environment"
                id="mpesa.environment"
                value={settings.mpesa.environment}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="sandbox">Sandbox (Testing)</option>
                <option value="production">Production (Live)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bank Transfer Configuration */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Bank Transfer</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="bankTransfer.enabled"
                checked={settings.bankTransfer.enabled}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable Bank Transfer</span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bankTransfer.accountName" className="block text-sm font-medium text-gray-700">
                Account Name
              </label>
              <input
                type="text"
                name="bankTransfer.accountName"
                id="bankTransfer.accountName"
                value={settings.bankTransfer.accountName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="bankTransfer.accountNumber" className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input
                type="text"
                name="bankTransfer.accountNumber"
                id="bankTransfer.accountNumber"
                value={settings.bankTransfer.accountNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="bankTransfer.bankName" className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <input
                type="text"
                name="bankTransfer.bankName"
                id="bankTransfer.bankName"
                value={settings.bankTransfer.bankName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="bankTransfer.branchName" className="block text-sm font-medium text-gray-700">
                Branch Name
              </label>
              <input
                type="text"
                name="bankTransfer.branchName"
                id="bankTransfer.branchName"
                value={settings.bankTransfer.branchName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Cash on Delivery Configuration */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Cash on Delivery</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="cashOnDelivery.enabled"
                checked={settings.cashOnDelivery.enabled}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable Cash on Delivery</span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cashOnDelivery.minimumOrder" className="block text-sm font-medium text-gray-700">
                Minimum Order Amount (KES)
              </label>
              <input
                type="number"
                name="cashOnDelivery.minimumOrder"
                id="cashOnDelivery.minimumOrder"
                value={settings.cashOnDelivery.minimumOrder}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="cashOnDelivery.maximumOrder" className="block text-sm font-medium text-gray-700">
                Maximum Order Amount (KES)
              </label>
              <input
                type="number"
                name="cashOnDelivery.maximumOrder"
                id="cashOnDelivery.maximumOrder"
                value={settings.cashOnDelivery.maximumOrder}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700">
                Default Currency
              </label>
              <select
                name="defaultCurrency"
                id="defaultCurrency"
                value={settings.defaultCurrency}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="USD">USD - US Dollar</option>
              </select>
            </div>
            <div>
              <label htmlFor="minimumOrder" className="block text-sm font-medium text-gray-700">
                Minimum Order Amount (KES)
              </label>
              <input
                type="number"
                name="minimumOrder"
                id="minimumOrder"
                value={settings.minimumOrder}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentSettings;