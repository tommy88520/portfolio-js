import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetWorkDto {
  @IsString()
  @ApiProperty({ description: 'lang' })
  lang: string;
}
