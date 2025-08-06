import type { Budget } from '#models/budget.model';
import sql from '#start/spark';
import { Service } from 'typedi';

@Service()
export default class BudgetRepository {
  async createBudget(budget: Budget): Promise<Budget> {
    const [newBudget]: Budget[] = await sql`
      INSERT INTO budgets ${sql(budget)}
      RETURNING *
    `;
    if (!newBudget) throw new Error('Failed to create budget');
    return newBudget;
  }

  async updateBudget(id: number, budget: Partial<Budget>): Promise<Budget | undefined> {
    const [updatedBudget]: Budget[] = await sql`
      UPDATE budgets SET ${sql(budget)}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!updatedBudget) throw new Error('Failed to update budget');
    return updatedBudget;
  }

  async deleteBudget(id: number): Promise<void> {
    await sql`
      DELETE FROM budgets
      WHERE id = ${id}
    `;
  }

  async getBudgets(userId: number): Promise<Budget[]> {
    const budgets: Budget[] = await sql`
      SELECT * FROM budgets
      WHERE user_id = ${userId}
      ORDER BY start_date DESC
    `;
    return budgets;
  }

  async getBudgetById(id: number, userId: number): Promise<Budget | undefined> {
    const [budget]: Budget[] = await sql`
      SELECT * FROM budgets
      WHERE id = ${id} AND user_id = ${userId}
    `;
    return budget;
  }

  async getBudgetByCategory(userId: number, categoryId: number): Promise<Budget | undefined> {
    const [budget]: Budget[] = await sql`
      SELECT * FROM budgets
      WHERE user_id = ${userId} AND category_id = ${categoryId} AND is_active = true
      ORDER BY start_date DESC
      LIMIT 1
    `;
    return budget;
  }

  async getActiveBudgets(userId: number): Promise<Budget[]> {
    const budgets: Budget[] = await sql`
      SELECT * FROM budgets
      WHERE user_id = ${userId} AND is_active = true
      ORDER BY start_date DESC
    `;
    return budgets;
  }

  async getBudgetProgress(userId: number, categoryId: number, startDate: Date, endDate: Date) {
    const result = await sql`
      SELECT 
        b.amount as budget_amount,
        COALESCE(SUM(t.amount), 0) as spent_amount,
        (b.amount - COALESCE(SUM(t.amount), 0)) as remaining_amount,
        CASE 
          WHEN b.amount > 0 THEN (COALESCE(SUM(t.amount), 0) / b.amount * 100)
          ELSE 0
        END as percentage_used
      FROM budgets b
      LEFT JOIN transactions t ON b.category_id = t.category_id 
        AND t.user_id = ${userId} 
        AND t.date BETWEEN ${startDate} AND ${endDate}
        AND t.type = 'expense'
      WHERE b.user_id = ${userId} AND b.category_id = ${categoryId} AND b.is_active = true
      GROUP BY b.id, b.amount
    `;
    return result[0];
  }
} 