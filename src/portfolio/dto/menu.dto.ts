import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePortfolioDto {
  @IsString()
  @ApiProperty({ description: '連結' })
  navigation: string;

  @IsString()
  @ApiProperty({ description: '圖片' })
  image: string;
}
