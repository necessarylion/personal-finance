import { column, Model } from "bun-spark";

export class Account extends Model {
  @column({ primary: true })
  public id?: number;

  @column()
  public userId: number;

  @column()
  public name: string;

  @column()
  public type: 'checking' | 'savings' | 'credit' | 'investment' | 'cash';

  @column()
  public initialBalance: number;

  @column()
  public currentBalance?: number;

  @column()
  public currency: string;

  @column()
  public isActive: boolean;

  @column()
  public createdAt: Date;

  @column()
  public updatedAt?: Date;

  @column()
  public deletedAt?: Date;
} 