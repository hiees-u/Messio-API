import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserFacebookRepository } from './repositories/userFacebook.repository';
import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';

@Module({
  providers: [
    UserRepository,
    UserFacebookRepository,
    UserAccessTokenRepository,
  ],
  exports: [UserRepository, UserFacebookRepository, UserAccessTokenRepository],
})
export class DatabaseModule {}
