import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { UserFacebookResponseDto } from './dto/me.dto';
import { accessTokenResponseDto } from './dto/access-token.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from '../dto/login-response.dto';

@Injectable()
export class FacebookService {
  private readonly baseUrl = 'https://graph.facebook.com';
  private readonly baseUrlV19 = 'https://graph.facebook.com/v19.0';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(type: string, code: string): Promise<User | null> {
    let userInfo = null;
    if (type === 'facebook') {
      const accessToken = await this.getAccessToken(code);
      userInfo = await this.getUserInfo(accessToken.access_token);
    }

    let existingUser = null;

    if (userInfo) {
      existingUser = await this.prismaService.user.findFirst({
        where: {
          facebookAccounts: {
            some: {
              facebookId: userInfo.id,
            },
          },
        },
      });

      if (!existingUser) {
        existingUser = await this.prismaService.user.create({
          data: {
            email: userInfo.email,
            name: userInfo.name,
            facebookAccounts: {
              create: {
                facebookId: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                picture: {
                  create: {
                    url: userInfo.picture.data.url || '',
                    height: userInfo.picture.data.height || 0,
                    width: userInfo.picture.data.width || 0,
                    isSilhouette: userInfo.picture.data.is_silhouette || false,
                  },
                },
              },
            },
          },
        });
      }
    }

    return existingUser ?? null;
  }

  async getAccessToken(code: string): Promise<accessTokenResponseDto> {
    const clientId = this.configService.get<string>('FB_APP_ID');
    const clientSecret = this.configService.get<string>('FB_APP_SECRET');
    const redirectUri = this.configService.get<string>('FB_REDIRECT_URI');

    const url = `${this.baseUrlV19}/oauth/access_token`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: code,
          },
        }),
      );

      return response.data as accessTokenResponseDto;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }

  async getUserInfo(accessToken: string): Promise<UserFacebookResponseDto> {
    // Implement the logic to fetch user information using the access token
    // This typically involves making an HTTP request to Facebook's Graph API
    // and returning the user information from the response.
    const fields = 'id,name,email,picture';
    const url = `${this.baseUrl}/me`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            access_token: accessToken,
            fields: fields,
          },
        }),
      );
      return response.data as UserFacebookResponseDto;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  getPages(accessToken: string): any {
    // Implement the logic to fetch pages associated with the user using the access token
    // This typically involves making an HTTP request to Facebook's Graph API
    // and returning the pages information from the response.
    console.log(`${this.baseUrl}/me/accounts?access_token=${accessToken}`);
    return 'pages_info';
  }
}
