
import React from 'react';
import { Subscription, Category } from './types';

// --- ICONS ---
// Simple placeholder icons as functional components

export const SpotifyIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.39c-.28.44-.9.56-1.34.28-2.29-1.39-5.12-1.7-8.5-.94-.52.12-.99-.2-1.11-.72s.2-.99.72-1.11c3.8-.85 6.98-.44 9.63 1.1.44.28.56.9.28 1.34zm.88-2.58c-.34.54-1.08.7-1.62.36-2.58-1.58-6.43-2.02-9.43-1.1-.61.18-1.24-.15-1.42-.76s.15-1.24.76-1.42c3.48-1.04 7.85-.53 10.82 1.3.54.33.7 1.08.36 1.62zm.9-2.6c-.4.63-1.27.84-1.89.43-3-1.84-7.97-2.38-11.08-1.3-.72.25-1.48-.19-1.73-.91s.19-1.48.91-1.73c3.63-1.22 9.21-.62 12.72 1.5.63.4 84 1.27.44 1.89z" />
  </svg>
);

export const NetflixIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#E50914">
    <path d="M8.45 6.882v10.236L12.012 6.882v10.236L15.55 6.882v10.236h2.186V4.266h-2.18l-3.564 6.368L8.45 4.266H6.264v12.852h2.186V6.882z" />
  </svg>
);

export const NotionIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.562 4.313H8.375v15.375h1.563V9.5h4.625l.023 1.539h1.539V5.875a1.562 1.562 0 00-1.563-1.562zM9.938 5.875h3.062v2.063H9.938V5.875zM12.75 12.625c-.473 0-.93.078-1.344.227v5.273h1.344v-5.5z" />
  </svg>
);

export const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#FF0000">
        <path d="M21.582,6.186c-0.23-0.814-0.887-1.471-1.699-1.701C18.229,4,12,4,12,4S5.771,4,4.117,4.485c-0.812,0.23-1.469,0.887-1.7,1.701C2,7.84,2,12,2,12s0,4.16,0.417,5.814c0.23,0.814,0.888,1.471,1.7,1.701C5.771,20,12,20,12,20s6.229,0,7.883-0.485c0.812-0.23,1.469-0.887,1.699-1.701C22,16.16,22,12,22,12S22,7.84,21.582,6.186z M9.933,15.223V8.777L15.467,12L9.933,15.223z"/>
    </svg>
);

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Spotify',
    logo: SpotifyIcon,
    cost: 10.99,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    category: Category.Entertainment,
    paymentMethod: "Visa **** 1234",
    reminderEnabled: true,
  },
  {
    id: '2',
    name: 'Netflix',
    logo: NetflixIcon,
    cost: 15.49,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 12)),
    category: Category.Entertainment,
    paymentMethod: "Visa **** 1234",
    reminderEnabled: true,
  },
  {
    id: '3',
    name: 'Notion',
    logo: NotionIcon,
    cost: 10.00,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 21)),
    category: Category.Work,
    paymentMethod: "Visa **** 1234",
    reminderEnabled: true,
  },
  {
      id: '4',
      name: 'YouTube Premium',
      logo: YoutubeIcon,
      cost: 13.99,
      renewalDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      category: Category.Entertainment,
      paymentMethod: "Visa **** 1234",
      reminderEnabled: false,
  }
];
