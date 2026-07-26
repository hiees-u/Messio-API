import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FacebookGraphClient } from '../clients/facebook-graph.client';

import type { OauthAccessTokenResponseDto } from '../dto/oauth-access-token.graph.response';
import type { MeGraphResponseDto } from '../dto/me.graph.response';

@Injectable()
export class FacebookUserApiGraph {
  constructor(
    private readonly configService: ConfigService,
    private readonly graphClient: FacebookGraphClient,
  ) {}

  async getMe(accessToken: string, fields: string) {
    return this.graphClient.get<MeGraphResponseDto>('/me', {
      access_token: accessToken,
      fields,
    });
  }

  async getUserAccessToken(code: string) {
    const clientId = this.configService.get<string>('FB_APP_ID');
    const clientSecret = this.configService.get<string>('FB_APP_SECRET');
    const redirectUri = this.configService.get<string>('FB_REDIRECT_URI');

    const response = this.graphClient.get<OauthAccessTokenResponseDto>(
      '/v19.0/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code,
      },
    );
    return response;
  }
}
