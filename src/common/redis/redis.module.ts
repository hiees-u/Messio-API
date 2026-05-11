import { Global, Module } from '@nestjs/common';
// import { RedisService } from './redis.service';
import { RedisProvider } from './redis.provider';

@Global()
@Module({
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {}
