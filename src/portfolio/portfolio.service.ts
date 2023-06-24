import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/menu.dto';
import { CreateWorkDto } from './dto/work.dto';
import { PortfolioRepository } from './portfolio.repo';
import { Menu } from './entities/menu.entity';
import { Work } from './entities/work.entity';

@Injectable()
export class PortfolioService {
  constructor(private readonly portfolioRepo: PortfolioRepository) {}
  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const result = await this.portfolioRepo.createMenu(createMenuDto);
    return result;
  }

  async getAllMenu(): Promise<Menu[]> {
    return await this.portfolioRepo.getAllMenu();
  }

  async updateMenu(
    id: string,
    updatePortfolioDto: CreateMenuDto,
  ): Promise<Menu> {
    return await this.portfolioRepo.updateMenu(id, updatePortfolioDto);
  }

  async removeMenu(id: string): Promise<boolean> {
    return await this.portfolioRepo.removeMenu(id);
  }

  // --work--

  async createWork(createWorkDto: CreateWorkDto): Promise<Work> {
    const result = await this.portfolioRepo.createWork(createWorkDto);
    return result;
  }

  async getAllWork(): Promise<Work[]> {
    return await this.portfolioRepo.getAllWork();
  }

  async updateWork(
    id: string,
    updatePortfolioDto: CreateWorkDto,
  ): Promise<Work> {
    return await this.portfolioRepo.updateWork(id, updatePortfolioDto);
  }

  async removeWork(id: string): Promise<boolean> {
    return await this.portfolioRepo.removeWork(id);
  }
}
