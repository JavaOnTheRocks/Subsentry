
import React, { useState } from 'react';
import { Subscription, Category } from '../types';
import { CalendarIcon, BellIcon } from './Icons';

// Reusable component since it's only used here.
const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      className={`${
        enabled ? 'bg-brand-accent' : 'bg-gray-200 dark:bg-gray-600'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  );
};

interface SubscriptionDetailProps {
  subscription: Subscription;
  onUpdate: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

const SubscriptionDetail: React.FC<SubscriptionDetailProps> = ({ subscription, onUpdate, onDelete }) => {
  const [reminderEnabled, setReminderEnabled] = useState(subscription.reminderEnabled);

  const handleToggleReminder = (enabled: boolean) => {
    setReminderEnabled(enabled);
    onUpdate({ ...subscription, reminderEnabled: enabled });
  };
  
  const categoryColorMap: { [key in Category]: string } = {
    [Category.Entertainment]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    [Category.Work]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    [Category.Utilities]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    [Category.Other]: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
  };

  const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-4">
      <p className="text-brand-text-secondary-light dark:text-brand-text-secondary-dark">{label}</p>
      <div className="font-medium text-brand-text-light dark:text-brand-text-dark">{value}</div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-brand-light dark:bg-brand-dark rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-inner">
            <subscription.logo className="h-12 w-12" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-brand-text-light dark:text-brand-text-dark">{subscription.name}</h1>
            <p className="text-brand-text-secondary-light dark:text-brand-text-secondary-dark">You're all set for this month!</p>
          </div>
        </div>

        <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
          <DetailRow
            label="Next Renewal"
            value={subscription.renewalDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          />
          <DetailRow
            label="Plan Cost"
            value={`$${subscription.cost.toFixed(2)} / month`}
          />
          <DetailRow
            label="Category"
            value={<span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColorMap[subscription.category]}`}>{subscription.category}</span>}
          />
          <DetailRow
            label="Payment Method"
            value={subscription.paymentMethod}
          />
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BellIcon className="h-5 w-5 text-brand-text-secondary-light dark:text-brand-text-secondary-dark" />
              <p className="text-brand-text-secondary-light dark:text-brand-text-secondary-dark">Renewal Reminder</p>
            </div>
            <ToggleSwitch enabled={reminderEnabled} onChange={handleToggleReminder} />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to cancel your ${subscription.name} subscription? This cannot be undone.`)) {
                onDelete(subscription.id);
              }
            }}
            className="w-full sm:w-auto text-center font-semibold text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors py-2 px-4"
          >
            Cancel Subscription
          </button>
          <button className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow">
            Edit Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
