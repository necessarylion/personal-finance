import { Account } from '#models/account.model';
import spark from '#start/spark';
import { Service } from 'typedi';

@Service()
export default class AccountRepository {
  /**
   * Generates SQL for calculating the current balance of an account
   * by summing all transactions (income, expenses, transfers) and adding to base balance
   * @returns SQL template for current balance calculation
   */
  #getCurrentBalanceCalculation() {
    return `
      COALESCE(
        accounts.initial_balance + (
          SELECT COALESCE(SUM(
            CASE 
              WHEN t.type = 'income' THEN t.amount
              WHEN t.type = 'expense' THEN -t.amount
              WHEN t.type = 'transfer' THEN 
                CASE 
                  WHEN t.amount > 0 THEN t.amount
                  ELSE -ABS(t.amount)
                END
              ELSE 0
            END
          ), 0)
          FROM transactions t
          WHERE t.account_id = accounts.id 
          AND t.deleted_at IS NULL
        ), 
        accounts.initial_balance
      ) as current_balance
    `;
  }
  /**
   * Creates a new account in the database
   * @param account - The account data to create
   * @returns Promise<Account> - The created account with generated ID and timestamps
   * @throws Error if account creation fails
   */
  async createAccount(account: Account): Promise<Account> {
    return await Account.create(account);
  }

  /**
   * Updates an existing account in the database
   * @param id - The account ID to update
   * @param account - Partial account data containing fields to update
   * @returns Promise<Account | undefined> - The updated account or undefined if not found
   * @throws Error if account update fails
   */
  async updateAccount(id: number, account: Partial<Account>): Promise<Account | undefined> {
    const [updatedAccount]: Account[] = await Account.query()
      .where('id', id)
      .update(account);
    if (!updatedAccount) throw new Error('Failed to update account');
    return updatedAccount;
  }

  /**
   * Permanently deletes an account from the database
   * @param id - The account ID to delete
   * @returns Promise<void>
   */
  async deleteAccount(id: number): Promise<void> {
    await Account.query().where('id', id).delete();
  }

  /**
   * Retrieves all accounts for a specific user with calculated current balances
   * @param userId - The user ID to get accounts for
   * @returns Promise<Account[]> - Array of accounts with current_balance field
   */
  async getAccounts(userId: number): Promise<Account[]> {
    const accounts = await Account.query()
      .select(['accounts.*', this.#getCurrentBalanceCalculation()])
      .where('user_id', '=', userId)
      .whereNull('deleted_at')
      .orderBy('name', 'ASC')
      .get();
    return accounts;
  }

  /**
   * Retrieves a specific account by ID for a user with calculated current balance
   * @param id - The account ID to retrieve
   * @param userId - The user ID for security validation
   * @returns Promise<Account | undefined> - The account with current_balance field or undefined if not found
   */
  async getAccountById(id: number, userId: number): Promise<Account | null> {
    const account = await Account.query()
      .select(['accounts.*', this.#getCurrentBalanceCalculation()])
      .where('user_id', userId)
      .whereNull('deleted_at')
      .where('id', id)
      .orderBy('name', 'ASC').first();
    return account;
  }

  /**
   * Updates the initial balance of an account (does not affect transaction-based current balance)
   * @param id - The account ID to update
   * @param initialBalance - The new initial balance amount
   * @returns Promise<Account | undefined> - The updated account or undefined if not found
   */
  async updateAccountBalance(id: number, initialBalance: number): Promise<Account | undefined> {
    const [updatedAccount]: Account[] = await Account.query().where('id', id).update({ initialBalance });
    return updatedAccount;
  }
} 