import { Injectable } from '@nestjs/common';
import { AuthServiceCommon } from 'src/common/auth/auth.service';
import { PayloadTokenDto } from 'src/common/auth/dto/payload.token.dto';

import { ReuqestWithUserGoogle } from 'src/common/auth/dto/request-with-user-google.type';
import { UseUserRepository } from 'src/modules/users/repositories/useUser.repository';

@Injectable()
export class GoogleService {
  constructor(
    private readonly useUserRepository: UseUserRepository,
    private readonly authServiceCommon: AuthServiceCommon,
  ) {}

  async handlerAuthGoogle(user: ReuqestWithUserGoogle) {
    const userWithGoogle =
      await this.useUserRepository.upsertUserWithGoogleAuth(user.user);

    const payloadJWT: PayloadTokenDto = {
      id: userWithGoogle.user.id.toString(),
      name: userWithGoogle.user.name,
      sub: userWithGoogle.googleId,
    };

    const tokenJwt = await this.authServiceCommon.generateToken(payloadJWT);

    console.log(tokenJwt);
  }
}
