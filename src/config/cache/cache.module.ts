import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { CacheRedisConfig } from './redis.config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    LogModule,
    CacheModule.registerAsync({ isGlobal: true, useClass: CacheRedisConfig }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
