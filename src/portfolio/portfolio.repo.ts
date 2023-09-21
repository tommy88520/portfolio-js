import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Menu } from './entities/menu.entity';
import { Work } from './entities/work.entity';
import { Skills } from './entities/skills.entity';
import { Tag } from './entities/tag.entity';
import { CreateWorkDto } from './dto/work.dto';
import { CreateMenuDto } from './dto/menu.dto';
import { SkillsDto } from './dto/skills.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class PortfolioRepository {
  constructor(
    // @InjectModel(Menu.name)
    // private menuModel: Model<MenuDocument>,
    // @InjectModel(Work.name)
    // private workModel: Model<WorkDocument>,
    // @InjectModel(Skills.name)
    // private skillsModel: Model<SkillsDocument>,
    @InjectRepository(Menu)
    private readonly menuModel: Repository<Menu>,
    @InjectRepository(Work)
    private readonly workModel: Repository<Work>,
    @InjectRepository(Skills)
    private readonly skillsModel: Repository<Skills>,
    @InjectRepository(Tag)
    private readonly tagModel: Repository<Tag>,
  ) {}

  async createMenu(query: CreateMenuDto): Promise<Menu> {
    const result = this.menuModel.save(query);
    return await result;
  }

  async getAllMenu(): Promise<Menu[]> {
    return await this.menuModel.find();
  }

  async updateMenu(
    id: number,
    query: CreateMenuDto,
  ): Promise<Observable<UpdateResult>> {
    return from(this.menuModel.update(id, query));
  }

  async removeMenu(id: string): Promise<Observable<DeleteResult>> {
    const result = this.menuModel.delete(id);
    return from(result);
  }

  // // --work--

  async createWork(query: CreateWorkDto): Promise<Work> {
    const result = this.workModel.save(query);
    return await result;
  }

  async getAllWork(): Promise<Work[]> {
    return await this.workModel.find({
      relations: ['tags'],
      order: { createdAt: 'DESC' },
    });
  }
  async getLastWork() {
    return await this.workModel.findOne({
      where: {},
      order: { id: 'DESC' },
    });
  }

  async updateWork(
    id: string,
    query: CreateWorkDto,
  ): Promise<Observable<UpdateResult>> {
    return from(this.workModel.update(id, query));
  }

  async removeWork(id: string): Promise<Observable<DeleteResult>> {
    const result = this.workModel.delete(id);
    return from(result);
  }

  async createTag(query) {
    const result = await this.tagModel.save(query);
    return result;
  }

  // // --skills--

  // async createSkills(query: SkillsDto): Promise<Skills> {
  //   const result = new this.skillsModel(query);
  //   return await result.save();
  // }

  // async getAllSkills(): Promise<Skills[]> {
  //   return await this.skillsModel.find();
  // }

  // async updateSkills(id: string, query: SkillsDto): Promise<Skills> {
  //   const objId = new Types.ObjectId(id);
  //   const result = await this.skillsModel.findOneAndUpdate(
  //     { _id: objId },
  //     query,
  //     {
  //       new: true,
  //     },
  //   );
  //   return result;
  // }

  // async removeSkills(id: string): Promise<boolean> {
  //   const objId = new Types.ObjectId(id);
  //   const result = await this.skillsModel.deleteOne({ _id: objId });
  //   return result.acknowledged;
  // }
}
