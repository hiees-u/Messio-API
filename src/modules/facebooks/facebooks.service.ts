import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TokenEncryptionService } from 'src/common/crypto/token-encryption.service';
import { UserAccessTokenResponse } from 'src/database/repositories/userAccessToken.response';
import { FacebookPageDto } from './dto/facebook.page.dto';
import {
  FacebookMeAccountsGrapResponse,
  FacebookPageGrap,
} from './dto/facebook.pages.grap';

@Injectable()
export class FacebooksService {
  constructor(
    private readonly useAccessToken: UserAccessTokenResponse,
    private readonly tokenEncryption: TokenEncryptionService,
    private readonly httpService: HttpService,
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

        return pages;
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }

  async getUserAccessToken(id: string) {
    const userAccessTokenEncryption = await this.useAccessToken.getToken(id);

    const userAccessTokenDecrytion = this.tokenEncryption.decrypt(
      userAccessTokenEncryption!.token,
    );

    return userAccessTokenDecrytion;
  }
}
