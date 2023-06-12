import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './entities/menu.entity';
import { Types } from 'mongoose';

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

  async updateMenu(id, query): Promise<Menu> {
    const objId = new Types.ObjectId(id);
    const result = await this.menuModel.findOneAndUpdate(
      { _id: objId },
      query,
      {
        new: true,
      },
    );

    console.log(result);
    return result;
  }
}
