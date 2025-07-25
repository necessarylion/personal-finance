import type { Account } from '#models/account.model';
import sql from '#start/sql';
import { Service } from 'typedi';

@Service()
export default class AccountRepository {
  async createAccount(account: Account): Promise<Account> {
    const [newAccount]: Account[] = await sql`
      INSERT INTO accounts ${sql(account)}
      RETURNING *
    `;
    if (!newAccount) throw new Error('Failed to create account');
    return newAccount;
  }

  async updateAccount(id: number, account: Partial<Account>): Promise<Account | undefined> {
    const [updatedAccount]: Account[] = await sql`
      UPDATE accounts SET ${sql(account)}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!updatedAccount) throw new Error('Failed to update account');
    return updatedAccount;
  }

  async deleteAccount(id: number): Promise<void> {
    await sql`
      DELETE FROM accounts
      WHERE id = ${id}
    `;
  }

  async getAccounts(userId: number): Promise<Account[]> {
    const accounts: Account[] = await sql`
      SELECT * FROM accounts
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    return accounts;
  }

  async getAccountById(id: number, userId: number): Promise<Account | undefined> {
    const [account]: Account[] = await sql`
      SELECT * FROM accounts
      WHERE id = ${id} AND user_id = ${userId}
    `;
    return account;
  }

  async updateAccountBalance(id: number, balance: number): Promise<Account | undefined> {
    const [updatedAccount]: Account[] = await sql`
      UPDATE accounts SET balance = ${balance}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return updatedAccount;
  }
} 