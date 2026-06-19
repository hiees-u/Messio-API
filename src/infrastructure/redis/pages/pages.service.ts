import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PagesCacheDto } from './dto/page.cache.dto';

@Injectable()
export class RedisPagesService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  setPagesUserId(id: string, pages: PagesCacheDto[]) {
    this.redis
      .set(id, JSON.stringify(pages), 'EX', 3600)
      .catch((error) => console.error('Redis error', error));
  }

  async getPagesUserId(id: string) {
    const page = await this.redis.get(id);
    return (page ? JSON.parse(page) : []) as PagesCacheDto[];
  }
}
