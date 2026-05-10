import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserFacebookRepository } from './repositories/userFacebook.repository';
import { UserAccessTokenResponse } from './repositories/userAccessToken.response';

@Module({
  providers: [UserRepository, UserFacebookRepository, UserAccessTokenResponse],
  exports: [UserRepository, UserFacebookRepository, UserAccessTokenResponse],
})
export class DatabaseModule {}
