import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserFacebookRepository } from './repositories/userFacebook.repository';
import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';
import { UsePageRepository } from './repositories/usePage.repository';

@Module({
  providers: [
    UserRepository,
    UserFacebookRepository,
    UserAccessTokenRepository,
    UsePageRepository,
  ],
  exports: [
    UserRepository,
    UserFacebookRepository,
    UserAccessTokenRepository,
    UsePageRepository,
  ],
})
export class DatabaseModule {}
