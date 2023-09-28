import { Type } from 'class-transformer';

import {
  IsString,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WorkDetailDto {
  @IsString()
  @ApiProperty({ description: 'Title' })
  title: string;

  @IsString()
  @ApiProperty({ description: 'content' })
  content: string;

  @ApiProperty({
    description: 'WorkDetail',
    default: ['img'],
    isArray: true,
  })
  workDetailImages: string[];
}

export class CreateWorkPageDto {
  @IsNumber()
  @ApiProperty({ description: 'workId', default: 1 })
  workId: number;

  @IsString()
  @ApiProperty({ description: 'Title' })
  title: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => WorkDetailDto)
  @ApiProperty({
    description: 'WorkDetail',
    type: WorkDetailDto, // 更新为数组类型
    isArray: true, // 更新为数组类型
  })
  @IsArray() // 新增验证数组
  workDetail: WorkDetailDto;
}
