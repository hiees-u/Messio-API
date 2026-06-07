import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios, { AxiosError } from 'axios';

import { UserFacebookResponseDto } from './dto/me.dto';
import { accessTokenResponseDto } from './dto/access-token.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { TokenEncryptionService } from 'src/common/crypto/token-encryption.service';
import { AuthService } from 'src/common/auth/auth.service';
import { UseFacebookReponsitory } from 'src/modules/facebooks/repositories/useFacebook.repository';

@Injectable()
export class FacebookService {
  private readonly baseUrl = 'https://graph.facebook.com';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly userFacebookRepository: UseFacebookReponsitory,
    private readonly tokenEncryptionService: TokenEncryptionService,
    private readonly authService: AuthService,
  ) {}

  async login(code: string): Promise<LoginResponseDto | null> {
    const accessToken = await this.getAccessToken(code);
    const userInfo = await this.getUserInfo(accessToken.access_token);

    let existingUser = null;

    if (userInfo) {
      const encryptedToken = this.tokenEncryptionService.encrypt(
        accessToken.access_token,
      );

      existingUser = await this.userFacebookRepository.upsertUserWithFacebook({
        name: userInfo.name,
        email: userInfo.email,
        facebook: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          picture: {
            url: userInfo.picture.data.url || '',
            height: userInfo.picture.data.height || 0,
            width: userInfo.picture.data.width || 0,
            isSilhouette: userInfo.picture.data.is_silhouette || false,
          },
          token: {
            token: encryptedToken,
            expiresAt: accessToken.expires_in
              ? new Date(Date.now() + accessToken.expires_in * 1000)
              : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // HardCode: token expires in 30 days
          },
        },
      });
    }

    return {
      accessToken: await this.authService.generateToken({
        sub: userInfo?.id || '',
        id: existingUser?.id.toString() || '',
        name: existingUser?.name || '',
      }),
    };
  }

  async getAccessToken(code: string): Promise<accessTokenResponseDto> {
    const clientId = this.configService.get<string>('FB_APP_ID');
    const clientSecret = this.configService.get<string>('FB_APP_SECRET');
    const redirectUri = this.configService.get<string>('FB_REDIRECT_URI');

    const url = `${this.baseUrl}/v19.0/oauth/access_token`;
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        const fbError = err.response?.data;

        throw new BadRequestException({
          message: 'Facebook API error',
          details: fbError,
        });
      }

      throw new InternalServerErrorException('Unexpected error');
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
}
