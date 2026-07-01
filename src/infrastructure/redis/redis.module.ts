import { Global, Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { RedisPagesService } from './pages/pages.service';

@Global()
@Module({
  providers: [RedisProvider, RedisPagesService],
  exports: [RedisProvider, RedisPagesService],
})
export class RedisModule {}
