import { IsString } from 'class-validator';
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
}
