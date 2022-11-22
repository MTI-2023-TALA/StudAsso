import { CacheModule, Module } from '@nestjs/common';

import { CacheConfigService } from './cache-config.service';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      extraProviders: [CacheConfigService],
      useExisting: CacheConfigService,
    }),
  ],
  providers: [RedisService, CacheConfigService],
  exports: [RedisService],
})
export class BackendCoreRedisModule {}
