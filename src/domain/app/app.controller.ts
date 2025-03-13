import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getGetHello(): string {
    return this.appService.getGetHello();
  }

  @Post()
  postHello(): string {
    return this.appService.getPostHello();
  }
}
