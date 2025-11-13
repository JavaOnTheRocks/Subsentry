
import React from 'react';
import { Subscription } from '../types';
import { BellIcon, ChevronDownIcon } from './Icons';

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      className={`${
        enabled ? 'bg-brand-accent' : 'bg-gray-300 dark:bg-gray-600'
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

interface ReminderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptions: Subscription[];
  onUpdateSubscription: (subscription: Subscription) => void;
}

const ReminderSettingsModal: React.FC<ReminderSettingsModalProps> = ({ isOpen, onClose, subscriptions, onUpdateSubscription }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="bg-brand-light dark:bg-brand-dark-secondary rounded-2xl shadow-xl w-full max-w-lg p-8 transform transition-all" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center mb-2 text-brand-text-light dark:text-brand-text-dark">Reminder Settings</h2>
        <p className="text-center text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-8">Choose when and how you want to be reminded about upcoming payments.</p>

        <div className="space-y-6">
            {/* Global Settings */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <BellIcon className="h-5 w-5" />
                        <span className="font-semibold">All Reminders</span>
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pl-8">
                     <div>
                        <label className="block text-sm font-medium text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-1">Remind me:</label>
                        <div className="relative">
                            <select className="w-full appearance-none px-3 py-2 bg-brand-light-secondary dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent">
                                <option>3 days before</option>
                                <option>1 day before</option>
                                <option>On the day</option>
                            </select>
                            <ChevronDownIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-1">Send reminders via:</label>
                        <div className="space-y-2 pt-1">
                            <label className="flex items-center space-x-2"><input type="checkbox" className="form-checkbox h-4 w-4 rounded text-brand-accent focus:ring-brand-accent" defaultChecked/> <span>Email</span></label>
                            <label className="flex items-center space-x-2"><input type="checkbox" className="form-checkbox h-4 w-4 rounded text-brand-accent focus:ring-brand-accent" defaultChecked/> <span>Push Notification</span></label>
                        </div>
                     </div>
                </div>
            </div>

            {/* Individual Subscriptions */}
            <div>
                <h3 className="font-semibold mb-4 text-brand-text-light dark:text-brand-text-dark">Individual Subscriptions</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {subscriptions.map(sub => (
                        <div key={sub.id} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white dark:bg-gray-700 rounded-md flex items-center justify-center shadow">
                                    <sub.logo className="h-5 w-5"/>
                                </div>
                                <span className="font-medium text-brand-text-light dark:text-brand-text-dark">{sub.name}</span>
                            </div>
                            <ToggleSwitch enabled={sub.reminderEnabled} onChange={(enabled) => onUpdateSubscription({...sub, reminderEnabled: enabled})} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-8">
            <button type="button" onClick={onClose} className="font-semibold text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors px-4 py-2">Cancel</button>
            <button type="button" onClick={onClose} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ReminderSettingsModal;
