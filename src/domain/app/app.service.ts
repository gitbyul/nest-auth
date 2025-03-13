import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGetHello(): string {
    return 'Get Hello World!';
  }

  getPostHello(): string {
    return 'Post Hello World!';
  }
}
