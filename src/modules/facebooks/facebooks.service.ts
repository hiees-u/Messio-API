import Redis from 'ioredis';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import { TokenEncryptionService } from 'src/common/crypto/token-encryption.service';
import { UserAccessTokenRepository } from 'src/database/repositories/userAccessToken.repository';
import { FacebookPageDto } from './dto/facebook.page.dto';
import {
  FacebookPageGrap,
  FacebookMeAccountsGrapResponse,
  FacebookPageRegisterMetaAppResponse,
} from './dto/facebook.pages.grap';
import { RedisPagesService } from 'src/common/redis/pages/pages.service';

@Injectable()
export class FacebooksService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly redisPageService: RedisPagesService,
    private readonly httpService: HttpService,
    private readonly useAccessToken: UserAccessTokenRepository,
    private readonly tokenEncryption: TokenEncryptionService,
  ) {}

  private readonly baseUrl = 'https://graph.facebook.com';

  async getAllPagesUser(id: string) {
    try {
      let pages: FacebookPageDto[] =
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

  private async getUserAccessToken(id: string) {
    const userAccessTokenEncryption = await this.useAccessToken.getToken(id);

    const userAccessTokenDecrytion = this.tokenEncryption.decrypt(
      userAccessTokenEncryption!.token,
    );

    return userAccessTokenDecrytion;
  }

  private async getPagesForUserGrap(token: string) {
    const url = `${this.baseUrl}/me/accounts`;

    const res = await firstValueFrom(
      this.httpService.get<FacebookMeAccountsGrapResponse>(url, {
        params: {
          access_token: token,
        },
      }),
    );

    const pages: FacebookPageDto[] = res.data.data.map(
      (page: FacebookPageGrap) => {
        return {
          id: page.id,
          token: page.access_token,
          name: page.name,
          tasks: page.tasks,
        };
      },
    );

    return pages;
  }

  async registerPages(id: string, pageIds: string[]) {
    const pages = await this.getAllPagesUser(id);
    const pagesMap = new Map(pages?.map((page) => [page.id, page.token]));
    const paegsRegister = pageIds.map((pageId) => {
      return {
        id: pageId,
        token: pagesMap.get(pageId) || '',
      };
    });
    const results = await Promise.allSettled(
      paegsRegister.map(async (page) => {
        const val = await this.registerPage(page.id, page.token);
        return {
          pageId: page.id,
          status: val.success || false,
          code: val.error?.code || null,
          message: val.error?.message || null,
          errorSubcode: val.error?.error_subcode || null,
        };
      }),
    ).then((res) => {
      const successPagesIds = new Set(
        res
          .filter((result) => result.status === 'fulfilled')
          .map((result) => {
            const { pageId, status } = result.value;
            if (status) {
              return pageId;
            }
          }),
      );
      pages?.forEach((page) => {
        page.registered = successPagesIds.has(page.id);
      });

      this.redisPageService.setPagesUserId(id, pages || []);

      return successPagesIds;
    });

    return results;
  }

  async registerPage(pageId: string, token: string) {
    const url = `${this.baseUrl}/v23.0/${pageId}/subscribed_apps`;
    const res = await firstValueFrom(
      this.httpService.post<FacebookPageRegisterMetaAppResponse>(
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
