import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioDto } from './menu.dto';

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) {}
