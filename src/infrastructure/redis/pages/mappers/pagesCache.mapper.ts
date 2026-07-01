import { PageGrapResponse } from 'src/providers/facebook/dto/pages.graph.response';
import { PagesCacheDto } from '../dto/page.cache.dto';

export class PageCacheMapper {
  static fromGraph(data: PageGrapResponse[]): PagesCacheDto[] {
    return data.map((page) => {
      return {
        id: page.id,
        token: page.access_token,
        name: page.name,
        tasks: page.tasks,
        registered: false,
      };
    });
  }
}
