import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const ShippingSettings = () => {
  const [settings, setSettings] = useState({
    enableShipping: true,
    defaultShippingZone: 'nairobi',
    freeShippingThreshold: '5000',
    shippingZones: [
      {
        id: 'nairobi',
        name: 'Nairobi Metropolitan',
        rate: '250',
        estimatedDays: '1-2'
      },
      {
        id: 'upcountry',
        name: 'Upcountry Kenya',
        rate: '400',
        estimatedDays: '3-5'
      },
      {
        id: 'international',
        name: 'International Shipping',
        rate: '2500',
        estimatedDays: '7-14'
      }
    ],
    packageSizes: [
      {
        id: 'small',
        name: 'Small Package',
        maxWeight: '1',
        maxDimensions: '30x20x10',
        additionalRate: '0'
      },
      {
        id: 'medium',
        name: 'Medium Package',
        maxWeight: '5',
        maxDimensions: '50x30x20',
        additionalRate: '200'
      },
      {
        id: 'large',
        name: 'Large Package',
        maxWeight: '10',
        maxDimensions: '100x50x30',
        additionalRate: '500'
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleZoneChange = (zoneId, field, value) => {
    setSettings(prev => ({
      ...prev,
      shippingZones: prev.shippingZones.map(zone =>
        zone.id === zoneId ? { ...zone, [field]: value } : zone
      )
    }));
  };

  const handlePackageSizeChange = (sizeId, field, value) => {
    setSettings(prev => ({
      ...prev,
      packageSizes: prev.packageSizes.map(size =>
        size.id === sizeId ? { ...size, [field]: value } : size
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save shipping settings
      toast.success('Shipping settings saved successfully');
    } catch (error) {
      toast.error('Failed to save shipping settings');
      console.error('Error saving shipping settings:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Shipping Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="enableShipping"
                checked={settings.enableShipping}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable Shipping</span>
            </label>
            
            <div>
              <label htmlFor="defaultShippingZone" className="block text-sm font-medium text-gray-700">
                Default Shipping Zone
              </label>
              <select
                name="defaultShippingZone"
                id="defaultShippingZone"
                value={settings.defaultShippingZone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {settings.shippingZones.map(zone => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700">
                Free Shipping Threshold (KES)
              </label>
              <input
                type="number"
                name="freeShippingThreshold"
                id="freeShippingThreshold"
                value={settings.freeShippingThreshold}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Shipping Zones */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Zones</h3>
          <div className="space-y-4">
            {settings.shippingZones.map(zone => (
              <div key={zone.id} className="border rounded-md p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${zone.id}-name`} className="block text-sm font-medium text-gray-700">
                      Zone Name
                    </label>
                    <input
                      type="text"
                      id={`${zone.id}-name`}
                      value={zone.name}
                      onChange={(e) => handleZoneChange(zone.id, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${zone.id}-rate`} className="block text-sm font-medium text-gray-700">
                      Base Rate (KES)
                    </label>
                    <input
                      type="number"
                      id={`${zone.id}-rate`}
                      value={zone.rate}
                      onChange={(e) => handleZoneChange(zone.id, 'rate', e.target.value)}
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${zone.id}-days`} className="block text-sm font-medium text-gray-700">
                      Estimated Delivery (days)
                    </label>
                    <input
                      type="text"
                      id={`${zone.id}-days`}
                      value={zone.estimatedDays}
                      onChange={(e) => handleZoneChange(zone.id, 'estimatedDays', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Sizes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Package Sizes</h3>
          <div className="space-y-4">
            {settings.packageSizes.map(size => (
              <div key={size.id} className="border rounded-md p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${size.id}-name`} className="block text-sm font-medium text-gray-700">
                      Size Name
                    </label>
                    <input
                      type="text"
                      id={`${size.id}-name`}
                      value={size.name}
                      onChange={(e) => handlePackageSizeChange(size.id, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${size.id}-weight`} className="block text-sm font-medium text-gray-700">
                      Max Weight (kg)
                    </label>
                    <input
                      type="number"
                      id={`${size.id}-weight`}
                      value={size.maxWeight}
                      onChange={(e) => handlePackageSizeChange(size.id, 'maxWeight', e.target.value)}
                      min="0"
                      step="0.1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${size.id}-dimensions`} className="block text-sm font-medium text-gray-700">
                      Max Dimensions (cm)
                    </label>
                    <input
                      type="text"
                      id={`${size.id}-dimensions`}
                      value={size.maxDimensions}
                      onChange={(e) => handlePackageSizeChange(size.id, 'maxDimensions', e.target.value)}
                      placeholder="LxWxH"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${size.id}-rate`} className="block text-sm font-medium text-gray-700">
                      Additional Rate (KES)
                    </label>
                    <input
                      type="number"
                      id={`${size.id}-rate`}
                      value={size.additionalRate}
                      onChange={(e) => handlePackageSizeChange(size.id, 'additionalRate', e.target.value)}
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
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

export default ShippingSettings;