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

@Injectable()
export class FacebooksService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly httpService: HttpService,
    private readonly useAccessToken: UserAccessTokenResponse,
    private readonly tokenEncryption: TokenEncryptionService,
  ) {}

  private readonly baseUrl = 'https://graph.facebook.com';

  async getAllPagesUser(id: string) {
    const useAccessToken = await this.getUserAccessToken(id);
    if (useAccessToken) {
      const url = `${this.baseUrl}/me/accounts`;

      try {
        const res = await firstValueFrom(
          this.httpService.get<FacebookMeAccountsGrapResponse>(url, {
            params: {
              access_token: useAccessToken,
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

        this.redis
          .set(id, JSON.stringify(pages))
          .catch((error) => console.error('Redis error', error));

        return pages;
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }

  private async getUserAccessToken(id: string) {
    const userAccessTokenEncryption = await this.useAccessToken.getToken(id);

    const userAccessTokenDecrytion = this.tokenEncryption.decrypt(
      userAccessTokenEncryption!.token,
    );

    return userAccessTokenDecrytion;
  }

  //service nhận vào 1 [id] get từ pageOfUser -> add DB -> rm page của user.id ~ trong pageOfUser
  async getPagesUser(id: string) {
    const page = await this.redis.get(id);
    //func sẽ nhận 1 array page_id sau đó match với redis để lấy body -> add -> DB(postgress)
    return page;
  }
}
