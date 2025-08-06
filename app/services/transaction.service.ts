import { Service } from 'typedi';
import TransactionRepository from '#repositories/transaction.repository';
import AccountRepository from '#repositories/account.repository';
import type { Transaction } from '#models/transaction.model';
import type { VTransactionCreate, VTransactionUpdate } from '#validators/transaction.validator';

@Service()
export default class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async create(userId: number, payload: VTransactionCreate) {
    // Verify account exists and belongs to user
    const account = await this.accountRepository.getAccountById(payload.account_id, userId);
    if (!account) {
      throw new Error('Account not found');
    }

    const transactionData: Transaction = {
      ...payload,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const transaction = await this.transactionRepository.createTransaction(transactionData);

    // Note: Account balance is now calculated dynamically from transactions
    // No need to update initial_balance when creating transactions

    return transaction;
  }

  async update(userId: number, id: number, payload: VTransactionUpdate) {
    const transaction = await this.transactionRepository.getTransactionById(id, userId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const updateData = {
      ...payload,
      updated_at: new Date(),
    };

    const updatedTransaction = await this.transactionRepository.updateTransaction(id, updateData);

    // Note: Account balance is now calculated dynamically from transactions
    // No need to update initial_balance when updating transactions

    return updatedTransaction;
  }

  async delete(userId: number, id: number) {
    const transaction = await this.transactionRepository.getTransactionById(id, userId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    await this.transactionRepository.deleteTransaction(id);

    // Note: Account balance is now calculated dynamically from transactions
    // No need to update initial_balance when deleting transactions
  }

  async listing(userId: number, limit = 50, offset = 0) {
    return await this.transactionRepository.getTransactions(userId, limit, offset);
  }

  async getById(userId: number, id: number) {
    const transaction = await this.transactionRepository.getTransactionById(id, userId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  }

  async getByAccount(userId: number, accountId: number) {
    return await this.transactionRepository.getTransactionsByAccount(userId, accountId);
  }

  async getByCategory(userId: number, categoryId: number) {
    return await this.transactionRepository.getTransactionsByCategory(userId, categoryId);
  }

  async getByDateRange(userId: number, startDate: Date, endDate: Date) {
    return await this.transactionRepository.getTransactionsByDateRange(userId, startDate, endDate);
  }

  async getStats(userId: number, startDate: Date, endDate: Date) {
    return await this.transactionRepository.getTransactionStats(userId, startDate, endDate);
  }
} 