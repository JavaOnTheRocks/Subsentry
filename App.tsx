
import React, { useState, useEffect, useCallback } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import SubscriptionDetail from './components/SubscriptionDetail';
import AddSubscriptionModal from './components/AddSubscriptionModal';
import ReminderSettingsModal from './components/ReminderSettingsModal';
import { Subscription, View, Category } from './types';
import { MOCK_SUBSCRIPTIONS, SpotifyIcon } from './constants';
import { ShieldCheckIcon, BellIcon, UserCircleIcon, SunIcon, MoonIcon, PlusIcon } from './components/Icons';

type ModalType = 'addSubscription' | 'reminderSettings' | null;

const Header: React.FC<{
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenAddModal: () => void;
  onOpenReminders: () => void;
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}> = ({ currentView, onNavigate, onOpenAddModal, onOpenReminders, onThemeToggle, theme }) => {
  const navItemClasses = "py-2 px-3 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-gray-200 dark:bg-brand-dark-secondary text-brand-text-light dark:text-brand-text-dark";
  const inactiveClasses = "text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:bg-gray-200 dark:hover:bg-brand-dark-secondary";
  
  const navLinks: { view: View, label: string }[] = [
      { view: 'dashboard', label: 'Dashboard' },
      { view: 'subscriptions', label: 'Subscriptions' },
      { view: 'settings', label: 'Settings' },
  ];

  return (
    <header className="bg-brand-light dark:bg-brand-dark border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <ShieldCheckIcon className="h-8 w-8 text-brand-accent" />
              <span className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark">SubSentry</span>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              {navLinks.map(link => (
                <button 
                  key={link.view}
                  onClick={() => onNavigate(link.view)}
                  className={`${navItemClasses} ${currentView === link.view ? activeClasses : inactiveClasses}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onOpenAddModal} className="hidden sm:flex items-center space-x-2 bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              <PlusIcon className="h-5 w-5" />
              <span>Add Subscription</span>
            </button>
            <button onClick={onThemeToggle} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-brand-dark-secondary text-brand-text-secondary-light dark:text-brand-text-secondary-dark transition-colors">
              {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
            <button onClick={onOpenReminders} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-brand-dark-secondary text-brand-text-secondary-light dark:text-brand-text-secondary-dark transition-colors">
              <BellIcon className="h-6 w-6" />
            </button>
            <UserCircleIcon className="h-9 w-9 text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [modal, setModal] = useState<ModalType>(null);


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  
  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    if (view !== 'subscriptionDetail') {
      setSelectedSubscription(null);
    }
  }, []);

  const handleSelectSubscription = useCallback((subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setCurrentView('subscriptionDetail');
  }, []);

  const handleAddSubscription = (newSub: Omit<Subscription, 'id' | 'logo' | 'reminderEnabled' | 'paymentMethod'>) => {
    const newId = (subscriptions.length + 1).toString();
    setSubscriptions(prev => [...prev, {
      ...newSub,
      id: newId,
      logo: SpotifyIcon, // Mock logo for simplicity
      reminderEnabled: true,
      paymentMethod: "Visa **** 5678" // Mock payment method
    }]);
    setModal(null); // Close modal on save
  };

  const handleUpdateSubscription = (updatedSub: Subscription) => {
    setSubscriptions(prev => prev.map(s => s.id === updatedSub.id ? updatedSub : s));
    if (selectedSubscription && selectedSubscription.id === updatedSub.id) {
        setSelectedSubscription(updatedSub);
    }
  }

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
    handleNavigate('dashboard');
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const renderView = () => {
    switch (currentView) {
      case 'settings':
        return <Settings />;
      case 'subscriptionDetail':
        if (selectedSubscription) {
          return <SubscriptionDetail 
            subscription={selectedSubscription}
            onUpdate={handleUpdateSubscription}
            onDelete={handleDeleteSubscription}
          />;
        }
        // Fallback to dashboard if no subscription is selected
        return <Dashboard subscriptions={subscriptions} onSelectSubscription={handleSelectSubscription} onAddSubscription={() => setModal('addSubscription')} />;
      case 'subscriptions': // For now, subscriptions view is same as dashboard list
      case 'dashboard':
      default:
        return <Dashboard subscriptions={subscriptions} onSelectSubscription={handleSelectSubscription} onAddSubscription={() => setModal('addSubscription')} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-brand-light-secondary dark:bg-brand-dark-secondary text-brand-text-light dark:text-brand-text-dark">
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate}
        onOpenAddModal={() => setModal('addSubscription')}
        onOpenReminders={() => setModal('reminderSettings')}
        onThemeToggle={toggleTheme}
        theme={theme}
      />
      <main>
        {renderView()}
      </main>
      <AddSubscriptionModal
        isOpen={modal === 'addSubscription'}
        onClose={() => setModal(null)}
        onSave={handleAddSubscription}
      />
      <ReminderSettingsModal
        isOpen={modal === 'reminderSettings'}
        onClose={() => setModal(null)}
        subscriptions={subscriptions}
        onUpdateSubscription={handleUpdateSubscription}
      />
    </div>
  );
};

export default App;
