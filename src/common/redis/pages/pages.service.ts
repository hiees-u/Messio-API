import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { FacebookPageDto } from 'src/modules/facebooks/dto/facebook.page.dto';

@Injectable()
export class RedisPagesService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  setPagesUserId(id: string, pages: FacebookPageDto[]) {
    this.redis
      .set(id, JSON.stringify(pages), 'EX', 3600)
      .catch((error) => console.error('Redis error', error));
  }

  async getPagesUserId(id: string) {
    const page = await this.redis.get(id);
    return (page ? JSON.parse(page) : []) as FacebookPageDto[];
  }
}
