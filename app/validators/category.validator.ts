import vine from '@vinejs/vine';
import type { Infer } from '@vinejs/vine/types';

export const vCategoryCreate = vine.object({
  name: vine.string().trim().minLength(1).maxLength(255),
  type: vine.enum(['income', 'expense']),
  color: vine.string().trim().optional(),
  icon: vine.string().trim().optional(),
  is_active: vine.boolean(),
});

export const vCategoryUpdate = vine.object({
  name: vine.string().trim().minLength(1).maxLength(255).optional(),
  type: vine.enum(['income', 'expense']).optional(),
  color: vine.string().trim().optional(),
  icon: vine.string().trim().optional(),
  is_active: vine.boolean().optional(),
});

export type VCategoryCreate = Infer<typeof vCategoryCreate>;
export type VCategoryUpdate = Infer<typeof vCategoryUpdate>; 