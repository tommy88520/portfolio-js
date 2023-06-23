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
import { CreatePortfolioDto } from './dto/menu.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Types } from 'mongoose';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create-menu')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'createMenu' })
  @ApiBody({ type: CreatePortfolioDto })
  async create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get('get-menu')
  async getAllMenu() {
    return await this.portfolioService.getAllMenu();
  }

  @Patch('update-menu/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'updateMenu' })
  @ApiBody({ type: CreatePortfolioDto })
  async updateMenu(
    @Param('id') id: string,
    @Body() updatePortfolioDto: CreatePortfolioDto,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return await this.portfolioService.updateMenu(id, updatePortfolioDto);
  }

  @Delete(':id')
  async removeMenu(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return this.portfolioService.remove(id);
  }
}
