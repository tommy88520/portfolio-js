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

  async createMenu(query: Menu): Promise<Menu> {
    const result = new this.menuModel(query);
    return await result.save();
  }

  async getAllMenu(): Promise<Menu[]> {
    return await this.menuModel.find();
  }

  async updateMenu(id: string, query: Menu): Promise<Menu> {
    const objId = new Types.ObjectId(id);
    const result = await this.menuModel.findOneAndUpdate(
      { _id: objId },
      query,
      {
        new: true,
      },
    );
    return result;
  }

  async removeMenu(id: string): Promise<boolean> {
    const objId = new Types.ObjectId(id);
    const result = await this.menuModel.deleteOne({ _id: objId });
    return result.acknowledged;
  }
}
