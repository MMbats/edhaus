import React from 'react';
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid';

const StatsWidget = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  format = 'number',
  threshold = null,
  thresholdType = 'min',
  subtitle = '',
  footer = ''
}) => {
  const isPositive = changeType === 'increase';
  const isNegative = changeType === 'decrease';
  
  const formatValue = (val) => {
    switch (format) {
      case 'currency':
        return `KES ${Number(val).toLocaleString()}`;
      case 'percentage':
        return `${val}%`;
      case 'weight':
        return `${Number(val).toLocaleString()} kg`;
      case 'number':
      default:
        return Number(val).toLocaleString();
    }
  };

  const isThresholdExceeded = () => {
    if (!threshold || !value) return false;
    return thresholdType === 'min' 
      ? value < threshold 
      : value > threshold;
  };

  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${
      isThresholdExceeded() ? 'border-2 border-red-300' : ''
    }`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${
              isThresholdExceeded() ? 'text-red-400' : 'text-gray-400'
            }`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="flex items-center text-sm font-medium text-gray-500 truncate">
                {title}
                {isThresholdExceeded() && (
                  <ExclamationTriangleIcon className="ml-2 h-4 w-4 text-red-400" />
                )}
              </dt>
              {subtitle && (
                <dd className="text-xs text-gray-500 mt-0.5">
                  {subtitle}
                </dd>
              )}
              <dd className="flex items-baseline mt-1">
                <div className="text-2xl font-semibold text-gray-900">
                  {formatValue(value)}
                </div>
                {change && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    isPositive ? 'text-green-600' : 
                    isNegative ? 'text-red-600' : 
                    'text-gray-500'
                  }`}>
                    {isPositive ? (
                      <TrendingUpIcon className="self-center flex-shrink-0 h-5 w-5" />
                    ) : isNegative ? (
                      <TrendingDownIcon className="self-center flex-shrink-0 h-5 w-5" />
                    ) : null}
                    <span className="ml-1">{change}%</span>
                  </div>
                )}
              </dd>
              {footer && (
                <dd className="mt-2 text-sm text-gray-500">
                  {footer}
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;