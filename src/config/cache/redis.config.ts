import { Keyv, createKeyv } from '@keyv/redis';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheableMemory } from 'cacheable';

@Injectable()
export class CacheRedisConfig implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createCacheOptions(): CacheModuleOptions {
    const host = this.configService.get('REDIS_HOST');
    const port = this.configService.get('REDIS_PORT');
    const user = this.configService.get('REDIS_USER');
    const password = this.configService.get('REDIS_PASSWORD');
    const ttl = this.configService.get('REDIS_DEFULT_TTL'); // 10분 동안 캐시 유지
    const useClone = this.configService.get('REDIS_LRU_SIZE'); // 성능 최적화를 위해 원본 데이터를 반환
    const lruSize = this.configService.get('REDIS_DEEP_CLONE'); // 최대 1000개 항목을 저장 (LRU 적용)
    const checkInterval = this.configService.get('REDIS_CHECK_INTERVAL'); // 5초마다 만료된 항목을 검사하여 삭제

    const redisUrl = `redis://${user}:${password}@${host}:${port}`;

    return {
      stores: [
        new Keyv({
          store: new CacheableMemory({
            ttl,
            lruSize,
            useClone,
            checkInterval,
          }),
        }),
        createKeyv(redisUrl),
      ],
    };
  }
}
