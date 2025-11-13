
import React, { useState } from 'react';
import { Category, Subscription } from '../types';
import { SparklesIcon, ChevronDownIcon } from './Icons';

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subscription: Omit<Subscription, 'id' | 'logo' | 'reminderEnabled' | 'paymentMethod'>) => void;
}

const AddSubscriptionModal: React.FC<AddSubscriptionModalProps> = ({ isOpen, onClose, onSave }) => {
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState<Category>(Category.Entertainment);
  const [renewalDate, setRenewalDate] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !renewalDate || !cost) return;
    onSave({
      name: serviceName,
      category,
      renewalDate: new Date(renewalDate),
      cost: parseFloat(cost),
    });
    // Reset form
    setServiceName('');
    setCategory(Category.Entertainment);
    setRenewalDate('');
    setCost('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="bg-brand-light dark:bg-brand-dark-secondary rounded-2xl shadow-xl w-full max-w-lg p-8 transform transition-all" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center mb-6 text-brand-text-light dark:text-brand-text-dark">Add a New Subscription</h2>
        
        <button className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-brand-dark border border-gray-300 dark:border-gray-600 text-brand-text-light dark:text-brand-text-dark font-semibold py-3 px-4 rounded-lg mb-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <SparklesIcon className="h-5 w-5 text-brand-accent"/>
          <span>Auto Detect from Email</span>
        </button>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">OR ADD MANUALLY</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="serviceName" className="block text-sm font-medium text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-1">Service Name</label>
            <input type="text" id="serviceName" value={serviceName} onChange={e => setServiceName(e.target.value)} placeholder="e.g. Netflix" className="w-full px-4 py-2 bg-brand-light-secondary dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" required />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-1">Category</label>
            <div className="relative">
              <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full appearance-none px-4 py-2 bg-brand-light-secondary dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" required>
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDownIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="renewalDate" className="block text-sm font-medium text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-1">Renewal Date</label>
              <div className="relative">
                <input type="date" id="renewalDate" value={renewalDate} onChange={e => setRenewalDate(e.target.value)} className="w-full px-4 py-2 bg-brand-light-secondary dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" required />
              </div>
            </div>
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-1">Cost / Cycle</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" step="0.01" id="cost" value={cost} onChange={e => setCost(e.target.value)} placeholder="15.99" className="w-full pl-7 pr-16 py-2 bg-brand-light-secondary dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" required />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">/ Monthly</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="font-semibold text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors px-4 py-2">Cancel</button>
            <button type="submit" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition-colors">Save Subscription</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionModal;
