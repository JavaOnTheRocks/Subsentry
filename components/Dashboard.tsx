
import React from 'react';
// FIX: Import recharts components directly instead of from the window object.
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Subscription, Category } from '../types';
import { CalendarIcon, EyeIcon, PlusIcon } from './Icons';


const COLORS = {
  [Category.Entertainment]: '#34d399', // emerald-400
  [Category.Work]: '#60a5fa',         // blue-400
  [Category.Utilities]: '#facc15',     // yellow-400
  [Category.Other]: '#a78bfa',         // violet-400
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => (
  <div className="bg-brand-light dark:bg-brand-dark p-6 rounded-2xl shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark">{title}</p>
      <p className="text-2xl font-bold text-brand-text-light dark:text-brand-text-dark">{value}</p>
    </div>
    <div className="text-brand-text-secondary-light dark:text-brand-text-secondary-dark">{icon}</div>
  </div>
);

const SpendBreakdown: React.FC<{ subscriptions: Subscription[] }> = ({ subscriptions }) => {
  const totalSpend = subscriptions.reduce((sum, sub) => sum + sub.cost, 0);

  const dataByCategory = Object.values(Category).map(category => ({
    name: category,
    value: subscriptions.filter(s => s.category === category).reduce((sum, s) => sum + s.cost, 0),
  })).filter(item => item.value > 0);

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="mt-6 space-y-2">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
              <span className="text-brand-text-secondary-light dark:text-brand-text-secondary-dark">{entry.value}</span>
            </div>
            <span className="font-medium text-brand-text-light dark:text-brand-text-dark">
              ${(dataByCategory.find(d => d.name === entry.value)?.value ?? 0).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className="bg-brand-light dark:bg-brand-dark p-6 rounded-2xl shadow-md h-full">
      <h2 className="text-lg font-semibold text-brand-text-light dark:text-brand-text-dark mb-4">Monthly Spend Breakdown</h2>
      <div className="relative w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataByCategory}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {dataByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as Category]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-brand-text-secondary-light dark:text-brand-text-secondary-dark">Total</p>
            <p className="text-2xl font-bold text-brand-text-light dark:text-brand-text-dark">${totalSpend.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <CustomLegend payload={dataByCategory.map(d => ({ value: d.name, color: COLORS[d.name as Category] }))} />
    </div>
  );
};


const UpcomingRenewalItem: React.FC<{ subscription: Subscription; onSelect: (sub: Subscription) => void; }> = ({ subscription, onSelect }) => {
    const daysUntilRenewal = Math.ceil((subscription.renewalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div 
            onClick={() => onSelect(subscription)}
            className="flex items-center justify-between p-4 bg-brand-light-secondary/50 dark:bg-brand-dark-secondary/50 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        >
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow">
                  <subscription.logo className="h-6 w-6"/>
                </div>
                <div>
                    <p className="font-semibold text-brand-text-light dark:text-brand-text-dark">{subscription.name}</p>
                    <p className="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark">
                        {daysUntilRenewal > 0 ? `Renews in ${daysUntilRenewal} day${daysUntilRenewal > 1 ? 's' : ''}`: 'Renews today'}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-brand-text-light dark:text-brand-text-dark">${subscription.cost.toFixed(2)}</p>
                <p className="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark">{subscription.renewalDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
            </div>
        </div>
    );
};


const Dashboard: React.FC<{
  subscriptions: Subscription[];
  onSelectSubscription: (subscription: Subscription) => void;
  onAddSubscription: (sub: Omit<Subscription, 'id' | 'logo' | 'reminderEnabled'>) => void;
}> = ({ subscriptions, onSelectSubscription }) => {

  const totalMonthlySpend = subscriptions.reduce((acc, sub) => acc + sub.cost, 0);
  const upcomingRenewals = subscriptions.filter(sub => {
    const today = new Date();
    const renewal = sub.renewalDate;
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 30;
  });

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-brand-text-light dark:text-brand-text-dark mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SummaryCard title="Active Subscriptions" value={subscriptions.length.toString()} icon={<CalendarIcon className="h-8 w-8"/>} />
            <SummaryCard title="Upcoming Renewals" value={upcomingRenewals.length.toString()} icon={<CalendarIcon className="h-8 w-8" />} />
            <SummaryCard title="Total Monthly Spend" value={`$${totalMonthlySpend.toFixed(2)}`} icon={<EyeIcon className="h-8 w-8" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <SpendBreakdown subscriptions={subscriptions} />
            </div>
            <div className="lg:col-span-2 bg-brand-light dark:bg-brand-dark p-6 rounded-2xl shadow-md">
                <h2 className="text-lg font-semibold text-brand-text-light dark:text-brand-text-dark mb-4">Upcoming Renewals</h2>
                <div className="space-y-4">
                    {upcomingRenewals.length > 0 ? (
                        upcomingRenewals
                          .sort((a,b) => a.renewalDate.getTime() - b.renewalDate.getTime())
                          .map(sub => <UpcomingRenewalItem key={sub.id} subscription={sub} onSelect={onSelectSubscription} />)
                    ) : (
                        <p className="text-center py-8 text-brand-text-secondary-light dark:text-brand-text-secondary-dark">No upcoming renewals in the next 30 days.</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;