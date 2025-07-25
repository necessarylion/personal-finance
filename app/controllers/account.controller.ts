import { Service } from 'typedi';
import AccountService from '../services/account.service';
import { vAccountCreate, vAccountUpdate } from '#validators/account.validator';

@Service()
export default class AccountController {
  constructor(private readonly accountService: AccountService) {}

  public async index(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.accountService.listing(userId);
  }

  public async create(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const payload = await req.validate(vAccountCreate);
    return await this.accountService.create(userId, payload);
  }

  public async update(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    const payload = await req.validate(vAccountUpdate);
    return await this.accountService.update(userId, Number(req.params.id), payload);
  }

  public async destroy(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.accountService.delete(userId, Number(req.params.id));
  }

  public async show(req: Request) {
    const userId = 1; // TODO: Get from auth middleware
    return await this.accountService.getById(userId, Number(req.params.id));
  }
} 