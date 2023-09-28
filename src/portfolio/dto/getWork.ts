import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetWorkDto {
  @IsString()
  @ApiProperty({ default: 'en', description: 'lang' })
  lang: string;
}
