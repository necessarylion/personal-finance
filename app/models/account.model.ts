export interface Account {
  id?: number;
  user_id: number;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'cash';
  initial_balance: number;
  current_balance?: number;
  currency: string;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
} 