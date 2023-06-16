import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/menu.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfolioRepository } from './portfolio.repo';

@Injectable()
export class PortfolioService {
  constructor(private readonly portfolioRepo: PortfolioRepository) {}
  async create(createPortfolioDto: CreatePortfolioDto) {
    const result = await this.portfolioRepo.createMenu(createPortfolioDto);
    return result;
  }

  async getAllMenu() {
    return await this.portfolioRepo.getAllMenu();
  }

  // async updateMenu(id: number) {
  //   return `This action returns a #${id} portfoliodddd`;
  // }

  async updateMenu(id, updatePortfolioDto: CreatePortfolioDto) {
    return await this.portfolioRepo.updateMenu(id, updatePortfolioDto);
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
