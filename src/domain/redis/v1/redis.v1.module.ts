import { Module } from '@nestjs/common';
import { RedisService } from './redis.v1.service';

@Module({
  imports: [],
  providers: [RedisService],
})
export class RedisV1Module {}
