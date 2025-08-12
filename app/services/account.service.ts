import { Service } from 'typedi';
import AccountRepository from '#repositories/account.repository';
import type { Account } from '#models/account.model';
import type { VAccountCreate, VAccountUpdate } from '#validators/account.validator';

@Service()
export default class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(userId: number, payload: VAccountCreate) {
    const accountData: Partial<Account> = {
      ...payload,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.accountRepository.createAccount(accountData);
  }

  async update(userId: number, id: number, payload: VAccountUpdate) {
    const account = await this.accountRepository.getAccountById(id, userId);
    if (!account) {
      throw new Error('Account not found');
    }

    const updateData = {
      ...payload,
      updated_at: new Date(),
    };
    return this.accountRepository.updateAccount(id, updateData);
  }

  async delete(userId: number, id: number) {
    const account = await this.accountRepository.getAccountById(id, userId);
    if (!account) {
      throw new Error('Account not found');
    }
    return this.accountRepository.deleteAccount(id);
  }

  async listing(userId: number) {
    return await this.accountRepository.getAccounts(userId);
  }

  async getById(userId: number, id: number) {
    const account = await this.accountRepository.getAccountById(id, userId);
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  async updateBalance(userId: number, id: number, initialBalance: number) {
    const account = await this.accountRepository.getAccountById(id, userId);
    if (!account) {
      throw new Error('Account not found');
    }
    return this.accountRepository.updateAccountBalance(id, initialBalance);
  }
} 