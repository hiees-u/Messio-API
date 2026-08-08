import { Injectable } from '@nestjs/common';
import { AuthServiceCommon } from 'src/common/auth/auth.service';
import { TokenEncryptionService } from 'src/infrastructure/crypto/token-encryption.service';
import { FacebookUserApiGraph } from 'src/providers/facebook/services/facebook-user-api.service';
import { UseUserRepository } from '../users/repositories/useUser.repository';
import CreateUserDto from '../users/dto/createUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authServiceCommon: AuthServiceCommon,
    private readonly facebookUserApiGraph: FacebookUserApiGraph,
    private readonly tokenEncryptionService: TokenEncryptionService,
    private readonly UseUserRepository: UseUserRepository,
  ) {}

  async login(code: string): Promise<{ accessToken: string } | null> {
    const accessToken =
      await this.facebookUserApiGraph.getUserAccessToken(code);

    const userInfo = await this.facebookUserApiGraph.getMe(
      accessToken.access_token,
      'id,name,email,picture',
    );

    let existingUser = null;

    if (userInfo) {
      const encryptedToken = this.tokenEncryptionService.encrypt(
        accessToken.access_token,
      );

      const user: CreateUserDto = {
        name: userInfo.name,
        email: userInfo.email || '',
      };

      const userFacebook = {
        facebookId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email || '',
        token: encryptedToken,
        expiresAt: accessToken.expires_in
          ? new Date(Date.now() + accessToken.expires_in * 1000)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // HardCode: token expires in 30 days
        height: userInfo.picture.data.height,
        width: userInfo.picture.data.width,
        url: userInfo.picture.data.url,
        isSilhouette: userInfo.picture.data.is_silhouette,
      };

      existingUser = await this.UseUserRepository.upsertUserWithFacebook(
        user,
        userFacebook,
      );
    }

    return {
      accessToken: await this.authServiceCommon.generateToken({
        sub: userInfo?.id || '',
        id: existingUser?.id.toString() || '',
        name: existingUser?.name || '',
      }),
    };
  }
}
