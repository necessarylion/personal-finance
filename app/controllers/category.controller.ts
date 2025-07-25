import { Service } from 'typedi';
import CategoryService from '../services/category.service';
import { vCategoryCreate, vCategoryUpdate } from '#validators/category.validator';

@Service()
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  public async index(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.categoryService.listing(userId);
  }

  public async create(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const payload = await req.validate(vCategoryCreate);
    return await this.categoryService.create(userId, payload);
  }

  public async update(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const payload = await req.validate(vCategoryUpdate);
    return await this.categoryService.update(userId, Number(req.params.id), payload);
  }

  public async destroy(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.categoryService.delete(userId, Number(req.params.id));
  }

  public async show(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.categoryService.getById(userId, Number(req.params.id));
  }

  public async getByType(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const type = req.params.type as 'income' | 'expense';
    return await this.categoryService.getByType(userId, type);
  }
} 