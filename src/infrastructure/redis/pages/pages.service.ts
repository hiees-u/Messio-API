import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { PagesCacheDto } from './dto/page.cache.dto';
import { PageGrapResponse } from 'src/providers/facebook/dto/pages.graph.response';
import { PageCacheMapper } from './mappers/pagesCache.mapper';

@Injectable()
export class RedisPagesService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  setPagesGraph(id: string, pages: PageGrapResponse[]): PagesCacheDto[] {
    const pageCache: PagesCacheDto[] = PageCacheMapper.fromGraph(pages);
    this.redis
      .set(id, JSON.stringify(pageCache), 'EX', 3600)
      .catch((error) => console.error('Redis error', error));

    return pageCache;
  }

  setPages(id: string, pages: PagesCacheDto[]): PagesCacheDto[] {
    this.redis
      .set(id, JSON.stringify(pages), 'EX', 3600)
      .catch((error) => console.error('Redis error', error));

    return pages;
  }

  async getPagesUserId(id: string): Promise<PagesCacheDto[]> {
    const page = await this.redis.get(id);

    return (page ? JSON.parse(page) : []) as PagesCacheDto[];
  }
}
