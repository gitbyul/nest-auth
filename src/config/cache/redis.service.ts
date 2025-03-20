import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { LogUtil } from '../log/log.util';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly Logger: LogUtil,
  ) {}

  makeKey(type: string, keys: string[]) {
    return `${type}${keys.join('::')}`;
  }

  async save(key: string, value: string, ttl: number) {
    try {
      this.Logger.debug(`[Redis][SET]${key}:${value}`);
      return await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      this.Logger.error(`[Redis][ERROR] ${error.message}`);
      return null;
    }
  }

  async get(key: string) {
    try {
      const value = await this.cacheManager.get(key);
      this.Logger.debug(`[Redis][GET] ${key}:${value}`);
      return value;
    } catch (error) {
      this.Logger.error(`[Redis][ERROR] ${error.message}`);
      return null;
    }
  }
}
