import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/menu.dto';
import { CreateWorkDto } from './dto/work.dto';
import { SkillsDto } from './dto/skills.dto';
import { Menu } from './entities/menu.entity';
import { Work } from './entities/work.entity';
import { Skills } from './entities/skills.entity';
import { Tag } from './entities/tag.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuModel: Repository<Menu>,
    @InjectRepository(Work)
    private readonly workModel: Repository<Work>,
    @InjectRepository(Skills)
    private readonly skillsModel: Repository<Skills>,
    @InjectRepository(Tag)
    private readonly tagModel: Repository<Tag>,
  ) {}
  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const result = await this.menuModel.save(createMenuDto);
    return result;
  }

  async getAllMenu(): Promise<Menu[]> {
    return await this.menuModel.find();
  }

  async updateMenu(
    id: number,
    updatePortfolioDto: CreateMenuDto,
  ): Promise<Observable<UpdateResult>> {
    const result = from(this.menuModel.update(id, updatePortfolioDto));

    if (!result) throw new NotFoundException(`Entity with id ${id} not found`);

    return result;
  }

  async removeMenu(id: string): Promise<Observable<DeleteResult>> {
    const result = this.menuModel.delete(id);
    if (!result) throw new NotFoundException(`Entity with id ${id} not found`);
    return from(result);
  }

  // // --work--

  async createWork(createWorkDto: CreateWorkDto): Promise<any> {
    const { title, content, tag, lang, orderNumber, workImage } = createWorkDto;
    const work = this.workModel.create({
      title,
      content,
      lang,
      orderNumber,
      workImage,
    });
    const newTags = [];

    for (const tagData of tag) {
      const task = this.tagModel.create({ tag: tagData });
      await this.tagModel.save(task);
      newTags.push(task);
    }
    work.tags = newTags;
    await this.workModel.save(work);
    return 'great';
  }

  async getAllWork(getWorkDto): Promise<Work[]> {
    const result = await this.workModel.find({
      relations: ['tags'],
      order: { createdAt: 'DESC' },
      where: { lang: getWorkDto.lang },
    });

    result.forEach((work) => {
      work.tags.sort((a, b) => a.id - b.id);
    });

    return result;
  }

  async updateWork(
    id: number,
    updatePortfolioDto: CreateWorkDto,
  ): Promise<any> {
    const { title, content, tag } = updatePortfolioDto;

    const newTags = [];
    for (const tagData of tag) {
      const task = this.tagModel.create({ tag: tagData });

      await this.tagModel.save(task);
      newTags.push(task);
    }
    const work = await this.workModel.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!work) throw new NotFoundException(`Entity with id ${id} not found`);
    const newWork = { ...work, title, content, tags: newTags };
    await this.workModel.save(newWork);
    return 'great';
  }

  async removeWork(id: string): Promise<Observable<DeleteResult>> {
    const result = this.workModel.delete(id);
    if (!result) throw new NotFoundException(`Entity with id ${id} not found`);

    return from(result);
  }

  // --skills--

  async createSkills(createWorkDto: SkillsDto): Promise<Skills> {
    const result = await this.skillsModel.save(createWorkDto);
    return result;
  }

  async getAllSkills(): Promise<Skills[]> {
    return await this.skillsModel.find();
  }

  async updateSkills(
    id: string,
    updatePortfolioDto: SkillsDto,
  ): Promise<Observable<UpdateResult>> {
    return from(this.skillsModel.update(id, updatePortfolioDto));
  }

  async removeSkills(id: string): Promise<Observable<DeleteResult>> {
    const result = from(this.skillsModel.delete(id));
    if (!result) throw new NotFoundException(`Entity with id ${id} not found`);

    return result;
  }
}
