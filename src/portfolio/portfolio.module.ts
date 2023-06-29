import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Skills } from './entities/skills.entity';
import { Work } from './entities/work.entity';
import { Tag } from './entities/tag.entity';
import { PortfolioRepository } from './portfolio.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Skills, Work, Tag])],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository],
})
export class PortfolioModule {}
