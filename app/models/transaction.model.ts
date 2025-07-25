export interface Transaction {
  id?: number;
  user_id: number;
  account_id: number;
  category_id: number;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  description: string;
  date: Date;
  is_recurring: boolean;
  recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
} 