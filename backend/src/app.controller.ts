import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config-test')
  getConfigTest(): string {
    const port = this.configService.get<string>('PORT');
    return `Config is working correctly! PORT from env is: ${port}`;
  }
}
