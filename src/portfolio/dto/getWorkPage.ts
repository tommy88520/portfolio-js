import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetWorkPageDto {
  @IsString()
  @ApiProperty({ default: 'en', description: 'lang' })
  articleId: string;

  @IsString()
  @ApiProperty({ default: 'en', description: 'lang' })
  lang: string;
}
