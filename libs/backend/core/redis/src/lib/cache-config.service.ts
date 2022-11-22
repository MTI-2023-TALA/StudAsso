import * as redisStore from 'cache-manager-redis-store';

import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      port: this.configService.get('REDIS_PORT'),
      host: this.configService.get('REDIS_HOST'),
    };
  }
}
