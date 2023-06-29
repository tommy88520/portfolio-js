import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SkillsDto {
  @IsString()
  @ApiProperty({ description: '技能' })
  skill: string;

  @IsString()
  @ApiProperty({ description: '圖片' })
  image: string;
}
