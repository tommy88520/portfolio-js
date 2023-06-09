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

  findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
