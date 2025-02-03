import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const EmailSettings = () => {
  const [settings, setSettings] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    senderName: 'EdHaus Store',
    senderEmail: 'mumbipetermbatia@gmail.com',
    enableSSL: true,
    notifications: {
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      lowStock: true,
      newCustomerRegistration: true
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notifications.')) {
      const notificationKey = name.split('.')[1];
      setSettings(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: checked
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
      // TODO: Implement API call to save email settings
      toast.success('Email settings saved successfully');
    } catch (error) {
      toast.error('Failed to save email settings');
      console.error('Error saving email settings:', error);
    }
  };

  const handleTestEmail = async () => {
    try {
      // TODO: Implement API call to send test email
      toast.success('Test email sent successfully');
    } catch (error) {
      toast.error('Failed to send test email');
      console.error('Error sending test email:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Email Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SMTP Configuration */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SMTP Configuration</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700">
                SMTP Host
              </label>
              <input
                type="text"
                name="smtpHost"
                id="smtpHost"
                value={settings.smtpHost}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700">
                SMTP Port
              </label>
              <input
                type="text"
                name="smtpPort"
                id="smtpPort"
                value={settings.smtpPort}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="587"
              />
            </div>
            <div>
              <label htmlFor="smtpUsername" className="block text-sm font-medium text-gray-700">
                SMTP Username
              </label>
              <input
                type="text"
                name="smtpUsername"
                id="smtpUsername"
                value={settings.smtpUsername}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700">
                SMTP Password
              </label>
              <input
                type="password"
                name="smtpPassword"
                id="smtpPassword"
                value={settings.smtpPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="enableSSL"
                checked={settings.enableSSL}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable SSL/TLS</span>
            </label>
          </div>
        </div>

        {/* Sender Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sender Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
                Sender Name
              </label>
              <input
                type="text"
                name="senderName"
                id="senderName"
                value={settings.senderName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
                Sender Email
              </label>
              <input
                type="email"
                name="senderEmail"
                id="senderEmail"
                value={settings.senderEmail}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  name={`notifications.${key}`}
                  checked={value}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleTestEmail}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send Test Email
          </button>
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

export default EmailSettings;