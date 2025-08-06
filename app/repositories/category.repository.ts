import type { Category } from '#models/category.model';
import sql from '#start/spark';
import { Service } from 'typedi';

@Service()
export default class CategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    const [newCategory]: Category[] = await sql`
      INSERT INTO categories ${sql(category)}
      RETURNING *
    `;
    if (!newCategory) throw new Error('Failed to create category');
    return newCategory;
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<Category | undefined> {
    const [updatedCategory]: Category[] = await sql`
      UPDATE categories SET ${sql(category)}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!updatedCategory) throw new Error('Failed to update category');
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<void> {
    await sql`
      DELETE FROM categories
      WHERE id = ${id}
    `;
  }

  async getCategories(userId: number): Promise<Category[]> {
    const categories: Category[] = await sql`
      SELECT * FROM categories
      WHERE user_id = ${userId}
      ORDER BY name ASC
    `;
    return categories;
  }

  async getCategoryById(id: number, userId: number): Promise<Category | undefined> {
    const [category]: Category[] = await sql`
      SELECT * FROM categories
      WHERE id = ${id} AND user_id = ${userId}
    `;
    return category;
  }

  async getCategoriesByType(userId: number, type: 'income' | 'expense'): Promise<Category[]> {
    const categories: Category[] = await sql`
      SELECT * FROM categories
      WHERE user_id = ${userId} AND type = ${type}
      ORDER BY name ASC
    `;
    return categories;
  }
} 