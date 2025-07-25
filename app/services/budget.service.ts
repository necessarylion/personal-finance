import { Service } from 'typedi';
import BudgetRepository from '#repositories/budget.repository';
import CategoryRepository from '#repositories/category.repository';
import type { Budget } from '#models/budget.model';
import type { VBudgetCreate, VBudgetUpdate } from '#validators/budget.validator';

@Service()
export default class BudgetService {
  constructor(
    private readonly budgetRepository: BudgetRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async create(userId: number, payload: VBudgetCreate) {
    // Verify category exists and belongs to user
    const category = await this.categoryRepository.getCategoryById(payload.category_id, userId);
    if (!category) {
      throw new Error('Category not found');
    }

    // Check if there's already an active budget for this category
    const existingBudget = await this.budgetRepository.getBudgetByCategory(userId, payload.category_id);
    if (existingBudget) {
      throw new Error('An active budget already exists for this category');
    }

    const budgetData: Budget = {
      ...payload,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return this.budgetRepository.createBudget(budgetData);
  }

  async update(userId: number, id: number, payload: VBudgetUpdate) {
    const budget = await this.budgetRepository.getBudgetById(id, userId);
    if (!budget) {
      throw new Error('Budget not found');
    }

    const updateData = {
      ...payload,
      updated_at: new Date(),
    };
    return this.budgetRepository.updateBudget(id, updateData);
  }

  async delete(userId: number, id: number) {
    const budget = await this.budgetRepository.getBudgetById(id, userId);
    if (!budget) {
      throw new Error('Budget not found');
    }
    return this.budgetRepository.deleteBudget(id);
  }

  async listing(userId: number) {
    return await this.budgetRepository.getBudgets(userId);
  }

  async getById(userId: number, id: number) {
    const budget = await this.budgetRepository.getBudgetById(id, userId);
    if (!budget) {
      throw new Error('Budget not found');
    }
    return budget;
  }

  async getByCategory(userId: number, categoryId: number) {
    return await this.budgetRepository.getBudgetByCategory(userId, categoryId);
  }

  async getActive(userId: number) {
    return await this.budgetRepository.getActiveBudgets(userId);
  }

  async getProgress(userId: number, categoryId: number, startDate: Date, endDate: Date) {
    return await this.budgetRepository.getBudgetProgress(userId, categoryId, startDate, endDate);
  }
} 