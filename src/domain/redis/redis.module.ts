import { Module } from '@nestjs/common';
import { RedisV1Module } from './v1/redis.v1.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './v1/redis.v1.service';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), RedisV1Module],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
