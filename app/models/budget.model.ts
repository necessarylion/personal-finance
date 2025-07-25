export interface Budget {
  id?: number;
  user_id: number;
  category_id: number;
  amount: number;
  period: 'monthly' | 'yearly';
  start_date: Date;
  end_date?: Date;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
} 