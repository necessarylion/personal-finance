import type { Transaction } from '#models/transaction.model';
import sql from '#start/spark';
import { Service } from 'typedi';

@Service()
export default class TransactionRepository {
  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const [newTransaction]: Transaction[] = await sql`
      INSERT INTO transactions ${sql(transaction)}
      RETURNING *
    `;
    if (!newTransaction) throw new Error('Failed to create transaction');
    return newTransaction;
  }

  async updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction | undefined> {
    const [updatedTransaction]: Transaction[] = await sql`
      UPDATE transactions SET ${sql(transaction)}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!updatedTransaction) throw new Error('Failed to update transaction');
    return updatedTransaction;
  }

  async deleteTransaction(id: number): Promise<void> {
    await sql`
      DELETE FROM transactions
      WHERE id = ${id}
    `;
  }

  async getTransactions(userId: number, limit = 50, offset = 0): Promise<Transaction[]> {
    const transactions: Transaction[] = await sql`
      SELECT * FROM transactions
      WHERE user_id = ${userId}
      ORDER BY date DESC, created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return transactions;
  }

  async getTransactionById(id: number, userId: number): Promise<Transaction | undefined> {
    const [transaction]: Transaction[] = await sql`
      SELECT * FROM transactions
      WHERE id = ${id} AND user_id = ${userId}
    `;
    return transaction;
  }

  async getTransactionsByAccount(userId: number, accountId: number): Promise<Transaction[]> {
    const transactions: Transaction[] = await sql`
      SELECT * FROM transactions
      WHERE user_id = ${userId} AND account_id = ${accountId}
      ORDER BY date DESC, created_at DESC
    `;
    return transactions;
  }

  async getTransactionsByCategory(userId: number, categoryId: number): Promise<Transaction[]> {
    const transactions: Transaction[] = await sql`
      SELECT * FROM transactions
      WHERE user_id = ${userId} AND category_id = ${categoryId}
      ORDER BY date DESC, created_at DESC
    `;
    return transactions;
  }

  async getTransactionsByDateRange(userId: number, startDate: Date, endDate: Date): Promise<Transaction[]> {
    const transactions: Transaction[] = await sql`
      SELECT * FROM transactions
      WHERE user_id = ${userId} AND date BETWEEN ${startDate} AND ${endDate}
      ORDER BY date DESC, created_at DESC
    `;
    return transactions;
  }

  async getTransactionStats(userId: number, startDate: Date, endDate: Date) {
    const stats = await sql`
      SELECT 
        type,
        SUM(amount) as total_amount,
        COUNT(*) as transaction_count
      FROM transactions
      WHERE user_id = ${userId} AND date BETWEEN ${startDate} AND ${endDate}
      GROUP BY type
    `;
    return stats;
  }
} 