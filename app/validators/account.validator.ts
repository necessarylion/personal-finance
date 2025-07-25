import vine from '@vinejs/vine';
import type { Infer } from '@vinejs/vine/types';

export const vAccountCreate = vine.object({
  name: vine.string().trim().minLength(1).maxLength(255),
  type: vine.enum(['checking', 'savings', 'credit', 'investment', 'cash']),
  balance: vine.number().positive(),
  currency: vine.string().trim().minLength(3).maxLength(3),
  is_active: vine.boolean(),
});

export const vAccountUpdate = vine.object({
  name: vine.string().trim().minLength(1).maxLength(255).optional(),
  type: vine.enum(['checking', 'savings', 'credit', 'investment', 'cash']).optional(),
  balance: vine.number().positive().optional(),
  currency: vine.string().trim().minLength(3).maxLength(3).optional(),
  is_active: vine.boolean().optional(),
});

export type VAccountCreate = Infer<typeof vAccountCreate>;
export type VAccountUpdate = Infer<typeof vAccountUpdate>; 