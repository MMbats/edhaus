import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const GeneralSettings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'EdHaus',
    storeDescription: 'Your Premium Fashion Destination',
    language: 'English',
    currency: 'KES',
    timezone: 'Africa/Nairobi',
    adminPhone: '0792387703',
    adminEmail: 'mumbipetermbatia@gmail.com'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const SettingsSection = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">General Settings</h2>
        <Button
          type="submit"
          form="settings-form"
          variant="primary"
          loading={loading}
        >
          Save Changes
        </Button>
      </div>
      
      <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
        <SettingsSection title="Store Information">
          <Input
            label="Store Name"
            name="storeName"
            id="storeName"
            value={settings.storeName}
            onChange={handleChange}
            required
            fullWidth
          />
          <Input
            label="Store Description"
            name="storeDescription"
            id="storeDescription"
            value={settings.storeDescription}
            onChange={handleChange}
            fullWidth
          />
        </SettingsSection>

        <SettingsSection title="Regional Settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Language"
              name="language"
              id="language"
              value={settings.language}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Currency"
              name="currency"
              id="currency"
              value={settings.currency}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Timezone"
              name="timezone"
              id="timezone"
              value={settings.timezone}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </SettingsSection>

        <SettingsSection title="Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Admin Phone"
              name="adminPhone"
              id="adminPhone"
              type="tel"
              value={settings.adminPhone}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Admin Email"
              name="adminEmail"
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </SettingsSection>
      </form>
    </div>
  );
};

export default GeneralSettings;