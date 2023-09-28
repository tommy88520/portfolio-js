import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getNumber(): Promise<any> {
    return {
      FromRandomNumDbs: `this is loaded from version v${process.env.npm_package_version}`,
    };
  }
}
