import vine from '@vinejs/vine';
import type { Infer } from '@vinejs/vine/types';

export const vBudgetCreate = vine.object({
  category_id: vine.number().positive(),
  amount: vine.number().positive(),
  period: vine.enum(['monthly', 'yearly']),
  start_date: vine.date(),
  end_date: vine.date().optional(),
  is_active: vine.boolean(),
});

export const vBudgetUpdate = vine.object({
  category_id: vine.number().positive().optional(),
  amount: vine.number().positive().optional(),
  period: vine.enum(['monthly', 'yearly']).optional(),
  start_date: vine.date().optional(),
  end_date: vine.date().optional(),
  is_active: vine.boolean().optional(),
});

export type VBudgetCreate = Infer<typeof vBudgetCreate>;
export type VBudgetUpdate = Infer<typeof vBudgetUpdate>; 