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
    const key = [type, ...keys]
    return `${key.join('::')}`;
  }

  async set(key: string, value: string) {
    try {
      this.Logger.debug(`[Redis][SET][TTL -1] ${key}=${value}`);
      return await this.cacheManager.set(key, value);
    } catch (error) {
      this.Logger.error(`[Redis][ERROR] ${error.message}`);
      return null;
    }
  }
  
  async save(key: string, value: string, ttl: number) {
    try {
      this.Logger.debug(`[Redis][SET][TTL ${ttl / 1000}s] ${key}=${value}`);
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

  async del(key:string) {
    try {
      await this.cacheManager.del(key);
      this.Logger.debug(`[Redis][DEL] ${key}`);
    } catch (error) {
      this.Logger.error(`[Redis][ERROR] ${error.message}`);
      return null;
    }
  }
}
