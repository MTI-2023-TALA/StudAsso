import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  set(key: string, value: string, duration?: number): void {
    duration = duration ? duration : 0;
    this.cacheManager.set(key, value, { ttl: duration });
  }

  get(key: string): Promise<string> {
    return this.cacheManager.get(key);
  }
}
