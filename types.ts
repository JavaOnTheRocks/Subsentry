
import type { ComponentType } from 'react';

export enum Category {
  Entertainment = "Entertainment",
  Work = "Work",
  Utilities = "Utilities",
  Other = "Other",
}

export interface Subscription {
  id: string;
  name: string;
  logo: ComponentType<{ className?: string }>;
  cost: number;
  renewalDate: Date;
  category: Category;
  paymentMethod: string;
  reminderEnabled: boolean;
}

export type View = 'dashboard' | 'subscriptions' | 'settings' | 'subscriptionDetail';