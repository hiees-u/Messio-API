import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TokenEncryptionService } from 'src/common/crypto/token-encryption.service';
import { UserAccessTokenResponse } from 'src/database/repositories/userAccessToken.response';
import { FacebookPageDto } from './dto/facebook.page.dto';
import {
  FacebookMeAccountsGrapResponse,
  FacebookPageGrap,
} from './dto/facebook.pages.grap';
import Redis from 'ioredis';
import { RedisPagesService } from 'src/common/redis/pages/pages.service';

@Injectable()
export class FacebooksService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly redisPageService: RedisPagesService,
    private readonly httpService: HttpService,
    private readonly useAccessToken: UserAccessTokenResponse,
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

  //service nhận vào 1 [id] get từ pageOfUser -> add DB -> rm page của user.id ~ trong pageOfUser
  //getPagesUserId

  // /facebooks/pages-access
  // async accessPagesFacebook(id: string, pageId: string[]) {
  //   const pages = await this.getAllPagesUser(id);

  //   return pageId;
  // }

  // async subscribedApp(pageId: string) {

  // }
}
