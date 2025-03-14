import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  makeKey(type: string, key: string[]) {
    return `${type}${key.join('::')}`;
  }

  async set(
    type: string,
    key: string[],
    value: string | null,
    ttl: number | null,
  ) {
    console.log({ type, key, value, ttl });
    const result = await this.cacheManager.set(
      this.makeKey(type, key),
      value,
      ttl ?? 60,
    );
    console.log(result);
  }

  del(): string {
    return 'Post Hello World!';
  }
}
