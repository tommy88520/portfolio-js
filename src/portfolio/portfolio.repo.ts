import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './entities/menu.entity';
import { Work, WorkDocument } from './entities/work.entity';
import { CreateWorkDto } from './dto/work.dto';
import { CreateMenuDto } from './dto/menu.dto';
import { Types } from 'mongoose';

@Injectable()
export class PortfolioRepository {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<MenuDocument>,
    @InjectModel(Work.name)
    private workModel: Model<WorkDocument>,
  ) {}

  async createMenu(query: CreateMenuDto): Promise<Menu> {
    const result = new this.menuModel(query);
    return await result.save();
  }

  async getAllMenu(): Promise<Menu[]> {
    return await this.menuModel.find();
  }

  async updateMenu(id: string, query: CreateMenuDto): Promise<Menu> {
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

  // --work--

  async createWork(query: CreateWorkDto): Promise<Work> {
    const result = new this.workModel(query);
    return await result.save();
  }

  async getAllWork(): Promise<Work[]> {
    return await this.workModel.find();
  }

  async updateWork(id: string, query: CreateWorkDto): Promise<Work> {
    const objId = new Types.ObjectId(id);
    const result = await this.workModel.findOneAndUpdate(
      { _id: objId },
      query,
      {
        new: true,
      },
    );
    return result;
  }

  async removeWork(id: string): Promise<boolean> {
    const objId = new Types.ObjectId(id);
    const result = await this.workModel.deleteOne({ _id: objId });
    return result.acknowledged;
  }
}
