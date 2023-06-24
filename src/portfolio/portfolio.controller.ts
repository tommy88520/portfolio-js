import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreateMenuDto } from './dto/menu.dto';
import { CreateWorkDto } from './dto/work.dto';
import { Types } from 'mongoose';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';
import { Work } from './entities/work.entity';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create-menu')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'createMenu' })
  @ApiBody({ type: CreateMenuDto })
  async create(@Body() createPortfolioDto: CreateMenuDto): Promise<Menu> {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get('get-menu')
  async getAllMenu(): Promise<Menu[]> {
    return await this.portfolioService.getAllMenu();
  }

  @Patch('update-menu/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'updateMenu' })
  @ApiBody({ type: CreateMenuDto })
  async updateMenu(
    @Param('id') id: string,
    @Body() updatePortfolioDto: CreateMenuDto,
  ): Promise<Menu> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return await this.portfolioService.updateMenu(id, updatePortfolioDto);
  }

  @Delete('delete-menu/:id')
  async removeMenu(@Param('id') id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return this.portfolioService.removeMenu(id);
  }

  @Post('create-work')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'createMenu' })
  @ApiBody({ type: CreateWorkDto })
  async createWork(@Body() createWorkDto: CreateWorkDto): Promise<Work> {
    return this.portfolioService.createWork(createWorkDto);
  }

  @Get('get-work')
  async getAllWork(): Promise<Work[]> {
    return await this.portfolioService.getAllWork();
  }

  @Patch('update-work/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'updateMenu' })
  @ApiBody({ type: CreateWorkDto })
  async updateWork(
    @Param('id') id: string,
    @Body() updatePortfolioDto: CreateWorkDto,
  ): Promise<Work> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return await this.portfolioService.updateWork(id, updatePortfolioDto);
  }

  @Delete('delete-work/:id')
  async removeWork(@Param('id') id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return this.portfolioService.removeWork(id);
  }
}
