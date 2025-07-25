import vine from '@vinejs/vine';
import type { Infer } from '@vinejs/vine/types';

export const vTransactionCreate = vine.object({
  account_id: vine.number().positive(),
  category_id: vine.number().positive(),
  amount: vine.number().positive(),
  type: vine.enum(['income', 'expense', 'transfer']),
  description: vine.string().trim().minLength(1),
  date: vine.date(),
  is_recurring: vine.boolean(),
  recurring_frequency: vine.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
});

export const vTransactionUpdate = vine.object({
  account_id: vine.number().positive().optional(),
  category_id: vine.number().positive().optional(),
  amount: vine.number().positive().optional(),
  type: vine.enum(['income', 'expense', 'transfer']).optional(),
  description: vine.string().trim().minLength(1).optional(),
  date: vine.date().optional(),
  is_recurring: vine.boolean().optional(),
  recurring_frequency: vine.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
});

export type VTransactionCreate = Infer<typeof vTransactionCreate>;
export type VTransactionUpdate = Infer<typeof vTransactionUpdate>; 