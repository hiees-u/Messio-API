import Redis from 'ioredis';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import { TokenEncryptionService } from 'src/common/crypto/token-encryption.service';
import { RedisPagesService } from 'src/common/redis/pages/pages.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UseFacebookReponsitory } from './repositories/useFacebook.repository';
import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';

import type {
  PageGrapResponse,
  PagesGraphResponse,
  PageRegisterAppResponse,
} from './dto/pages.graph.dto';
import type { PagesCacheDto } from 'src/common/redis/pages/dto/page.cache.dto';
import type { PagesDto } from './dto/page.dto';
import { UsePageRepository } from './repositories/usePage.repository';
import { PageDbDto } from './dto/pageDb.dto';

@Injectable()
export class FacebooksService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly redisPageService: RedisPagesService,
    private readonly httpService: HttpService,
    private readonly tokenEncryption: TokenEncryptionService,
    private readonly useAccessToken: UserAccessTokenRepository,
    private readonly useFacebookReponsitory: UseFacebookReponsitory,
    private readonly usePageRepository: UsePageRepository,
    private prisma: PrismaService,
  ) {}

  private readonly baseUrl = 'https://graph.facebook.com';

  async getAllPagesUser(id: string): Promise<PagesDto[] | undefined> {
    try {
      let pages: PagesCacheDto[] =
        await this.redisPageService.getPagesUserId(id);

      if (pages.length === 0) {
        const useAccessToken = await this.getUserAccessToken(id);
        if (useAccessToken) {
          if (pages.length === 0)
            pages = await this.getPagesForUserGrap(useAccessToken);

          this.redisPageService.setPagesUserId(id, pages);
        }
      }
      return pages;
    } catch (error) {
      console.error(error);
    }
  }

  private async getUserAccessToken(id: string): Promise<string> {
    const userAccessTokenEncryption = await this.useAccessToken.getToken(id);

    const userAccessTokenDecrytion = this.tokenEncryption.decrypt(
      userAccessTokenEncryption!.token,
    );

    return userAccessTokenDecrytion;
  }

  private async getPagesForUserGrap(token: string): Promise<PagesDto[]> {
    const url = `${this.baseUrl}/me/accounts`;

    const res = await firstValueFrom(
      this.httpService.get<PagesGraphResponse>(url, {
        params: {
          access_token: token,
        },
      }),
    );

    const pages: PagesDto[] = res.data.data.map((page: PageGrapResponse) => {
      return {
        id: page.id,
        token: page.access_token,
        name: page.name,
        tasks: page.tasks,
      };
    });

    return pages;
  }

  async getPageDb(pageId: string): Promise<PageDbDto | null> {
    try {
      return await this.usePageRepository.getPageDb(pageId);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async registerPages(
    id: string,
    pageIds: string[],
  ): Promise<Set<string | undefined>> {
    const pages: PagesDto[] = (await this.getAllPagesUser(id)) || [];
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
        const val = await this.registerPage(pageId, pageToken);
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

      this.redisPageService.setPagesUserId(id, pages || []);

      void this.savePagesInDB(
        id,
        pages.filter((page) => {
          return page.registered;
        }),
      );

      return successPagesIds;
    });

    return results;
  }

  async savePagesInDB(id: string, pages: PagesDto[]) {
    try {
      const userFacebookId: number | undefined =
        await this.useFacebookReponsitory.getByFacebookId(id);

      await this.prisma.faceBookPage.createMany({
        data: pages.map((page) => ({
          userFacebookId: userFacebookId || -1,
          pageId: page.id,
          name: page.name,
          tasks: page.tasks,
          token: this.tokenEncryption.encrypt(page.token),
        })),
        skipDuplicates: true,
      });
    } catch (error) {
      console.error('Error inserting pages into database:', error);
    }
  }

  async registerPage(pageId: string, token: string) {
    const url = `${this.baseUrl}/v23.0/${pageId}/subscribed_apps`;
    const res = await firstValueFrom(
      this.httpService.post<PageRegisterAppResponse>(
        url,
        {},
        {
          params: {
            subscribed_fields: ['messages'],
            access_token: token,
          },
        },
      ),
    );
    return res.data;
  }
}
