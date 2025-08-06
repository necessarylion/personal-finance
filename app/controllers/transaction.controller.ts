import { Service } from 'typedi';
import TransactionService from '../services/transaction.service';
import { vTransactionCreate, vTransactionUpdate } from '#validators/transaction.validator';

@Service()
export default class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  public async index(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const query = req.query();
    const limit = Number(query.limit) || 50;
    const offset = Number(query.offset) || 0;
    return await this.transactionService.listing(userId, limit, offset);
  }

  public async create(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const payload = await req.validate(vTransactionCreate);
    return await this.transactionService.create(userId, payload);
  }

  public async update(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const payload = await req.validate(vTransactionUpdate);
    return await this.transactionService.update(userId, Number(req.params.id), payload);
  }

  public async destroy(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.transactionService.delete(userId, Number(req.params.id));
  }

  public async show(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.transactionService.getById(userId, Number(req.params.id));
  }

  public async getByAccount(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const accountId = Number(req.params.accountId);
    return await this.transactionService.getByAccount(userId, accountId);
  }

  public async getByCategory(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const categoryId = Number(req.params.categoryId);
    return await this.transactionService.getByCategory(userId, categoryId);
  }

  public async getByDateRange(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const query = req.query();
    const startDate = new Date(query.start as string);
    const endDate = new Date(query.end as string);
    return await this.transactionService.getByDateRange(userId, startDate, endDate);
  }

  public async getStats(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const query = req.query();
    const startDate = new Date(query.start as string);
    const endDate = new Date(query.end as string);
    return await this.transactionService.getStats(userId, startDate, endDate);
  }
} 