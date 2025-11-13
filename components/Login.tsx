
import React, { useState } from 'react';
import { ShieldCheckIcon, GoogleIcon } from './Icons';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#1A2332] flex flex-col items-center justify-center p-4 text-gray-200">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <ShieldCheckIcon className="h-10 w-10 text-brand-accent" />
            <h1 className="text-4xl font-bold">SubSentry</h1>
          </div>
          <p className="text-gray-400">Stay in Control of Your Subscriptions</p>
        </div>

        <div className="bg-[#2C3A4F] p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign In or Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-[#1A2332] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-[#1A2332] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2.5 px-4 rounded-md transition-transform transform hover:scale-105"
            >
              Get Started
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-4 text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center px-4 py-2.5 bg-[#424C5E] border border-gray-600 rounded-md hover:bg-opacity-80 transition"
          >
            <GoogleIcon className="h-5 w-5 mr-3" />
            <span className="font-semibold text-white">Continue with Google</span>
          </button>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <a href="#" className="hover:underline">Terms of Service</a>
          <span className="mx-2">&middot;</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
