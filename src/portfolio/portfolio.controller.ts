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
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreateMenuDto } from './dto/menu.dto';
import { CreateWorkDto } from './dto/work.dto';
import { CreateWorkPageDto } from './dto/workPage.dto';
import { SkillsDto } from './dto/skills.dto';
import { GetWorkDto } from './dto/getWork';
import { Types } from 'mongoose';
import { ApiBody, ApiOperation, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { Skills } from './entities/skills.entity';
import { Menu } from './entities/menu.entity';
import { Work } from './entities/work.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Observable } from 'rxjs';
import { FilesInterceptor } from '@nestjs/platform-express';
import uploadImg from '~/common/upload-img';

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
    @Param('id') id: number,
    @Body() updatePortfolioDto: CreateMenuDto,
  ) {
    return await this.portfolioService.updateMenu(id, updatePortfolioDto);
  }

  @Delete('delete-menu/:id')
  async removeMenu(@Param('id') id: string) {
    return this.portfolioService.removeMenu(id);
  }

  @Post('create-work')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'createMenu' })
  @ApiBody({ type: CreateWorkDto })
  async createWork(@Body() createWorkDto: CreateWorkDto): Promise<Work> {
    return this.portfolioService.createWork(createWorkDto);
  }

  @Post('get-work')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'getMenu' })
  async getAllWork(@Body() getWorkDto: GetWorkDto): Promise<Work[]> {
    return await this.portfolioService.getAllWork(getWorkDto);
  }

  @Patch('update-work/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'updateMenu' })
  @ApiBody({ type: CreateWorkDto })
  async updateWork(
    @Param('id') id: number,
    @Body() updatePortfolioDto: CreateWorkDto,
  ): Promise<any> {
    return await this.portfolioService.updateWork(id, updatePortfolioDto);
  }

  @Delete('delete-work/:id')
  async removeWork(@Param('id') id: string): Promise<Observable<DeleteResult>> {
    return this.portfolioService.removeWork(id);
  }

  @Post('create-skills')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'createSkills' })
  @ApiBody({ type: SkillsDto })
  async createSkills(@Body() createWorkDto: SkillsDto): Promise<Skills> {
    return this.portfolioService.createSkills(createWorkDto);
  }

  @Get('get-skills')
  async getAllSkills(): Promise<Skills[]> {
    return await this.portfolioService.getAllSkills();
  }

  @Patch('update-skills/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'updateSkills' })
  @ApiBody({ type: SkillsDto })
  async updateSkills(
    @Param('id') id: string,
    @Body() updatePortfolioDto: SkillsDto,
  ): Promise<Observable<UpdateResult>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return await this.portfolioService.updateSkills(id, updatePortfolioDto);
  }

  @Delete('delete-skills/:id')
  async removeSkills(
    @Param('id') id: string,
  ): Promise<Observable<DeleteResult>> {
    return this.portfolioService.removeSkills(id);
  }

  @Post('create-work-page')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'create work page' })
  @ApiBody({ type: CreateWorkPageDto })
  async createWorkPage(
    @Body() createWorkPageDto: CreateWorkPageDto,
  ): Promise<any> {
    return this.portfolioService.createWorkPage(createWorkPageDto);
  }

  @Post('get-work-page')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'get all work page' })
  async getAllWorkPage(@Body() getWorkDto: GetWorkDto): Promise<any> {
    return await this.portfolioService.getWorkPage();
  }

  @Post('upload-img')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'uploadImg' })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data') // 指定支持的媒体类型为 'multipart/form-data'
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // 将属性类型指定为数组
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await uploadImg(files);
  }
}
