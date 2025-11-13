
import React, { useState } from 'react';
import { GoogleIcon, SunIcon, MoonIcon, BellIcon, ArrowRightIcon } from './Icons';

// A self-contained card component for settings sections
const SettingsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-light dark:bg-brand-dark rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark mb-6">{title}</h2>
        {children}
    </div>
);

const Settings: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-brand-text-light dark:text-brand-text-dark mb-8">Settings</h1>
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Profile Information */}
                <SettingsCard title="Profile Information">
                    <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
                        <img src="https://picsum.photos/seed/ariaprofile/100/100" alt="Aria Montgomery" className="h-24 w-24 rounded-full" />
                        <div className="flex-grow space-y-4 w-full">
                            <div>
                                <label className="block text-sm font-medium text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-1">Full Name</label>
                                <input type="text" defaultValue="Aria Montgomery" className="w-full px-4 py-2 bg-brand-light-secondary dark:bg-brand-dark-secondary border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-1">Email Address</label>
                                <input type="email" defaultValue="aria.montgomery@example.com" className="w-full px-4 py-2 bg-brand-light-secondary dark:bg-brand-dark-secondary border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition-colors">Save Changes</button>
                    </div>
                </SettingsCard>

                {/* Connected Accounts */}
                <SettingsCard title="Connected Accounts">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-brand-light-secondary dark:bg-brand-dark-secondary rounded-lg">
                            <div className="flex items-center space-x-3">
                                <GoogleIcon />
                                <div>
                                    <p className="font-medium">Google</p>
                                    <p className="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark">aria.m@gmail.com</p>
                                </div>
                            </div>
                            <button className="text-sm font-semibold text-red-500 hover:text-red-700">Disconnect</button>
                        </div>
                         <div className="flex items-center justify-between p-4 bg-brand-light-secondary dark:bg-brand-dark-secondary rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="h-5 w-5 text-brand-text-light dark:text-brand-text-dark">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.6,3.2c-1.2-1.3-3.1-1.4-4.5-0.2c-0.8,0.7-1.3,1.6-1.5,2.6c-1.3,0.3-2.5,1-3.2,2.1c-1.3,1.9-1.2,4.5,0.2,6.3 c0.6,0.8,1.5,1.4,2.5,1.6c-0.1,0.3-0.1,0.5-0.2,0.8c-0.7,1.4-1,3-0.5,4.6c0.4,1.1,1.2,2.1,2.3,2.7c1,0.6,2.2,0.8,3.3,0.6 c0.3,0,0.5-0.1,0.8-0.2c1.1-0.5,2-1.3,2.7-2.4c1.4-2.2,1.1-5.1-0.6-7.1c-0.6-0.7-1.4-1.1-2.2-1.3c0-1.5,0.7-2.9,1.8-3.9 C15.9,4.8,15.5,3.9,14.6,3.2z M13.1,10.9c0.8,0.6,1.4,1.5,1.6,2.5c0.2,1.1,0,2.2-0.5,3.2c-0.5,0.9-1.4,1.6-2.4,1.9 c-1,0.2-2.1,0-3-0.6c-0.9-0.5-1.6-1.4-1.9-2.4c-0.2-1.1,0-2.2,0.5-3.2c0.5-0.9,1.4-1.6,2.4-1.9C10.7,10.1,11.9,10.2,13.1,10.9z"></path></svg>
                                </div>
                                <div>
                                    <p className="font-medium">Apple</p>
                                    <p className="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark">a.montgomery@icloud.com</p>
                                </div>
                            </div>
                            <button className="text-sm font-semibold text-red-500 hover:text-red-700">Disconnect</button>
                        </div>
                    </div>
                </SettingsCard>

                {/* App Preferences */}
                <SettingsCard title="App Preferences">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="font-medium">Theme</p>
                            <div className="flex items-center bg-brand-light-secondary dark:bg-brand-dark-secondary p-1 rounded-lg">
                                <button onClick={() => handleThemeChange('light')} className={`px-3 py-1 text-sm font-semibold rounded-md flex items-center space-x-1 ${theme === 'light' ? 'bg-white dark:bg-brand-dark shadow' : ''}`}>
                                    <SunIcon className="h-4 w-4" />
                                    <span>Light</span>
                                </button>
                                <button onClick={() => handleThemeChange('dark')} className={`px-3 py-1 text-sm font-semibold rounded-md flex items-center space-x-1 ${theme === 'dark' ? 'bg-white dark:bg-brand-dark shadow' : ''}`}>
                                    <MoonIcon className="h-4 w-4" />
                                    <span>Dark</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-brand-light-secondary dark:hover:bg-brand-dark-secondary cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <BellIcon className="h-5 w-5" />
                                <p className="font-medium">Manage Notifications</p>
                            </div>
                            <ArrowRightIcon />
                        </div>
                    </div>
                </SettingsCard>
            </div>
        </div>
    );
};

export default Settings;
