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

    // Update account balance
    let newBalance = account.balance;
    if (payload.type === 'income') {
      newBalance += payload.amount;
    } else if (payload.type === 'expense') {
      newBalance -= payload.amount;
    }

    await this.accountRepository.updateAccountBalance(account.id!, newBalance);

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

    // If amount or type changed, update account balance
    if (payload.amount !== undefined || payload.type !== undefined) {
      const account = await this.accountRepository.getAccountById(transaction.account_id, userId);
      if (account) {
        // Recalculate balance by getting all transactions for this account
        const accountTransactions = await this.transactionRepository.getTransactionsByAccount(userId, transaction.account_id);
        const totalIncome = accountTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = accountTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const newBalance = totalIncome - totalExpense;
        await this.accountRepository.updateAccountBalance(transaction.account_id, newBalance);
      }
    }

    return updatedTransaction;
  }

  async delete(userId: number, id: number) {
    const transaction = await this.transactionRepository.getTransactionById(id, userId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    await this.transactionRepository.deleteTransaction(id);

    // Update account balance
    const account = await this.accountRepository.getAccountById(transaction.account_id, userId);
    if (account) {
      const accountTransactions = await this.transactionRepository.getTransactionsByAccount(userId, transaction.account_id);
      const totalIncome = accountTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = accountTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const newBalance = totalIncome - totalExpense;
      await this.accountRepository.updateAccountBalance(transaction.account_id, newBalance);
    }
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