import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/menu.dto';
import { CreateWorkDto } from './dto/work.dto';
import { SkillsDto } from './dto/skills.dto';
import { Menu } from './entities/menu.entity';
import { Work } from './entities/work.entity';
import { Skills } from './entities/skills.entity';
import { Tag } from './entities/tag.entity';
import { WorkPage } from './entities/work-page.entity';
import { WorkDetail } from './entities/work-detail.entity';
import { WorkDetailImage } from './entities/work-detail-image.entity';
import { NotFoundException, BadRequestError } from '~/common/httpError';
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
    @InjectRepository(WorkPage)
    private readonly workPageModel: Repository<WorkPage>,
    @InjectRepository(WorkDetail)
    private readonly workDetailModel: Repository<WorkDetail>,
    @InjectRepository(WorkDetailImage)
    private readonly workDetailImageModel: Repository<WorkDetailImage>,
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

  async createWork(createWorkDto: CreateWorkDto): Promise<Work> {
    const { title, content, tag, lang, orderNumber, workImage, articleId } =
      createWorkDto;
    const work = this.workModel.create({
      title,
      content,
      lang,
      orderNumber,
      workImage,
      articleId,
    });
    const newTags = [];

    for (const tagData of tag) {
      const task = this.tagModel.create({ tag: tagData });
      await this.tagModel.save(task);
      newTags.push(task);
    }

    work.tags = newTags;

    return await this.workModel.save(work);
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
    if (!result) throw new NotFoundException(`No Data not found`);

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

  // work-page

  async createWorkPage(createWorkPageDto): Promise<any> {
    const { articleId, title, workDetail, lang } = createWorkPageDto;
    // const workModule = this.workModel.create({ articleId });
    const workPage = this.workPageModel.create({
      articleId,
      title,
      lang,
    });
    const newWorkDetail = [];
    for (const detailData of workDetail) {
      const workDetailItems = this.workDetailModel.create({
        title: detailData.title,
        content: detailData.content,
      });
      const newImage = [];
      for (const workImage of detailData.workDetailImages) {
        const image = this.workDetailImageModel.create({ image: workImage });
        await this.workDetailImageModel.save(image);
        newImage.push(image);
      }
      workDetailItems.workDetailImages = newImage;
      await this.workDetailModel.save(workDetailItems);

      newWorkDetail.push(workDetailItems);
    }
    workPage.workDetail = newWorkDetail;

    return await this.workPageModel.save(workPage);
  }

  async getWorkPage(articleId, lang) {
    const results = await this.workPageModel
      .createQueryBuilder('workPage')
      .leftJoinAndSelect('workPage.workDetail', 'workDetail')
      .leftJoinAndSelect('workDetail.workDetailImages', 'workDetailImages')
      .where('workPage.articleId = :articleId', { articleId })
      .andWhere('workPage.lang = :lang', { lang }) // 添加 lang 条件
      .orderBy('workDetail.createdAt', 'ASC')
      .addOrderBy('workDetailImages.createdAt', 'ASC')
      .getOne();

    // 上下兩種寫法都可以，
    // const results2 = await this.workPageModel.findOne({
    //   relations: ['workDetail', 'workDetail.workDetailImages'],
    //   order: { createdAt: 'DESC' },
    //   where: { articleId, lang }, // 这里使用了嵌套的 where 条件
    // });
    console.log(results);
    if (!results) throw new NotFoundException(`No Data not found`);

    return results;
  }
}
