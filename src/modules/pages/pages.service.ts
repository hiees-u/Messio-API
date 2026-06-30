import { Injectable } from '@nestjs/common';
import { PagesCacheDto } from 'src/infrastructure/redis/pages/dto/page.cache.dto';
import { RedisPagesService } from 'src/infrastructure/redis/pages/pages.service';
import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';
import { TokenEncryptionService } from 'src/infrastructure/crypto/token-encryption.service';
import { FacebookPageApiGraph } from 'src/providers/facebook/services/facebook-page-api.service';
import { UsePageRepository } from './repositories/usePage.repository';
import { PageGrapResponse } from 'src/providers/facebook/dto/pages.graph.response';
// import { PagesDto } from 'src/providers/facebook/dto/page.dto';

@Injectable()
export class PagesService {
  constructor(
    private readonly tokenEncryption: TokenEncryptionService,
    private readonly redisPageService: RedisPagesService,
    private readonly useAccessToken: UserAccessTokenRepository,
    private readonly facebookPageApiGraph: FacebookPageApiGraph,
    private readonly usePageRepository: UsePageRepository,
  ) {}

  async getAllPagesUser(id: string): Promise<PagesCacheDto[] | undefined> {
    try {
      let pages: PagesCacheDto[] =
        await this.redisPageService.getPagesUserId(id);

      if (pages.length === 0) {
        const useAccessToken = await this.getUserAccessTokenDecode(id);
        if (useAccessToken) {
          if (pages.length === 0) {
            const pageGraph: PageGrapResponse[] =
              await this.facebookPageApiGraph.getPages(useAccessToken);
            pages = this.redisPageService.setPagesGraph(id, pageGraph);
          }
        }
      }
      return pages;
    } catch (error) {
      console.error(error);
    }
  }

  private async getUserAccessTokenDecode(id: string): Promise<string> {
    const userAccessTokenEncryption = await this.useAccessToken.getToken(id);

    const userAccessTokenDecrytion = this.tokenEncryption.decrypt(
      userAccessTokenEncryption!.token,
    );

    return userAccessTokenDecrytion;
  }

  async registerPages(
    id: string,
    pageIds: string[],
  ): Promise<Set<string | undefined>> {
    const pages: PagesCacheDto[] = (await this.getAllPagesUser(id)) || [];
    const pagesMap = new Map(pages.map((page) => [page.id, page.token]));

    const results = await Promise.allSettled(
      pageIds.map(async (pageId) => {
        const pageToken = pagesMap.get(pageId);
        if (!pageToken) {
          return {
            success: false,
            code: null,
            message: 'Token not found',
            errorSubcode: null,
          };
        }
        const val = await this.facebookPageApiGraph.registerPage(
          pageId,
          pageToken,
        );
        return {
          pageId: pageId,
          status: val.success || false,
          code: val.error?.code || null,
          message: val.error?.message || null,
          errorSubcode: val.error?.error_subcode || null,
        };
      }),
    ).then((res) => {
      const successPagesIds = new Set(
        res
          .filter(
            (result) => result.status === 'fulfilled' && result.value.status,
          )
          .map((result) => {
            if (result.status === 'fulfilled') {
              return result.value.pageId;
            }
          }),
      );
      pages?.forEach((page) => {
        page.registered = successPagesIds.has(page.id);
      });

      this.redisPageService.setPages(id, pages || []);

      void this.usePageRepository.savePagesDb(
        id,
        pages.filter((page) => {
          return page.registered;
        }),
      );

      return successPagesIds;
    });

    return results;
  }

  async getPageDb(pageId: string) {
    return await this.usePageRepository.getPageDb(pageId);
  }
}
