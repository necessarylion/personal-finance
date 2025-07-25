import { Service } from 'typedi';
import CategoryRepository from '#repositories/category.repository';
import type { Category } from '#models/category.model';
import type { VCategoryCreate, VCategoryUpdate } from '#validators/category.validator';

@Service()
export default class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(userId: number, payload: VCategoryCreate) {
    const categoryData: Category = {
      ...payload,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return this.categoryRepository.createCategory(categoryData);
  }

  async update(userId: number, id: number, payload: VCategoryUpdate) {
    const category = await this.categoryRepository.getCategoryById(id, userId);
    if (!category) {
      throw new Error('Category not found');
    }

    const updateData = {
      ...payload,
      updated_at: new Date(),
    };
    return this.categoryRepository.updateCategory(id, updateData);
  }

  async delete(userId: number, id: number) {
    const category = await this.categoryRepository.getCategoryById(id, userId);
    if (!category) {
      throw new Error('Category not found');
    }
    return this.categoryRepository.deleteCategory(id);
  }

  async listing(userId: number) {
    return await this.categoryRepository.getCategories(userId);
  }

  async getById(userId: number, id: number) {
    const category = await this.categoryRepository.getCategoryById(id, userId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async getByType(userId: number, type: 'income' | 'expense') {
    return await this.categoryRepository.getCategoriesByType(userId, type);
  }
} 