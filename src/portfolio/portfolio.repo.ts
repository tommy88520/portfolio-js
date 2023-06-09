import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './entities/menu.entity';

@Injectable()
export class PortfolioRepository {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<MenuDocument>,
  ) {}

  async createMenu(query): Promise<Menu> {
    const result = new this.menuModel(query);
    return await result.save();
  }

  async getAllMenu(): Promise<Menu[]> {
    return await this.menuModel.find();
  }
}
