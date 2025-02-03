import React from 'react';
import { format } from 'date-fns';
import {
  CurrencyDollarIcon,
  TruckIcon,
  ArchiveBoxIcon,
  UserIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

const getActivityIcon = (type) => {
  switch (type) {
    case 'order':
      return <CurrencyDollarIcon className="h-5 w-5 text-white" />;
    case 'delivery':
      return <TruckIcon className="h-5 w-5 text-white" />;
    case 'stock':
      return <ArchiveBoxIcon className="h-5 w-5 text-white" />;
    case 'user':
      return <UserIcon className="h-5 w-5 text-white" />;
    case 'alert':
      return <ExclamationTriangleIcon className="h-5 w-5 text-white" />;
    case 'quote':
      return <ClipboardDocumentCheckIcon className="h-5 w-5 text-white" />;
    default:
      return null;
  }
};

const getActivityColor = (type) => {
  switch (type) {
    case 'order':
      return 'bg-blue-500';
    case 'delivery':
      return 'bg-green-500';
    case 'stock':
      return 'bg-yellow-500';
    case 'user':
      return 'bg-purple-500';
    case 'alert':
      return 'bg-red-500';
    case 'quote':
      return 'bg-indigo-500';
    default:
      return 'bg-gray-500';
  }
};

const RecentActivityWidget = ({ activities, maxItems = 5 }) => {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          {activities.length > maxItems && (
            <button className="text-sm text-primary-600 hover:text-primary-900">
              View all
            </button>
          )}
        </div>
        <div className="flow-root">
          <ul className="-mb-8">
            {displayActivities.map((activity, index) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== displayActivities.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {activity.content}{' '}
                          {activity.href ? (
                            <a href={activity.href} className="font-medium text-gray-900 hover:text-primary-600">
                              {activity.target}
                            </a>
                          ) : (
                            <span className="font-medium text-gray-900">{activity.target}</span>
                          )}
                        </p>
                        {activity.details && (
                          <p className="mt-1 text-sm text-gray-500">
                            {activity.details}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm whitespace-nowrap">
                        <div className="text-gray-900">
                          {format(new Date(activity.date), 'MMM d, yyyy')}
                        </div>
                        <div className="text-gray-500">
                          {format(new Date(activity.date), 'HH:mm')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityWidget;