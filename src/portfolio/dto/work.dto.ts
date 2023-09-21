import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkDto {
  @IsString()
  @ApiProperty({ description: 'Title' })
  title: string;

  @IsString()
  @ApiProperty({ description: 'Content' })
  content: string;

  @ApiProperty({
    description: 'Tag',
    default: ['JavaScript'],
    isArray: true,
  })
  tag: string[];

  @IsString()
  @ApiProperty({ default: 'en', description: 'lang' })
  lang: 'zhTw' | 'en';

  @IsNumber()
  @ApiProperty({ default: 1, description: 'orderNumber' })
  orderNumber: number;

  @IsString()
  @ApiProperty({ default: 'en', description: 'image' })
  workImage: string;
}
