import { Service } from 'typedi';
import BudgetService from '../services/budget.service';
import { vBudgetCreate, vBudgetUpdate } from '#validators/budget.validator';

@Service()
export default class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  public async index(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.budgetService.listing(userId);
  }

  public async create(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const payload = await req.validate(vBudgetCreate);
    return await this.budgetService.create(userId, payload);
  }

  public async update(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const payload = await req.validate(vBudgetUpdate);
    return await this.budgetService.update(userId, Number(req.params.id), payload);
  }

  public async destroy(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.budgetService.delete(userId, Number(req.params.id));
  }

  public async show(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.budgetService.getById(userId, Number(req.params.id));
  }

  public async getByCategory(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const categoryId = Number(req.params.categoryId);
    return await this.budgetService.getByCategory(userId, categoryId);
  }

  public async getActive(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.budgetService.getActive(userId);
  }

  public async getProgress(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const categoryId = Number(req.params.categoryId);
    const startDate = new Date(req.input('startDate'));
    const endDate = new Date(req.input('endDate'));
    return await this.budgetService.getProgress(userId, categoryId, startDate, endDate);
  }
} 