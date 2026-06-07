import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserFacebookRepository } from './repositories/userFacebook.repository';
import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';
import { UseCustomerRepository } from './repositories/useCustomer.repository';
import { UsePageRepository } from './repositories/usePage.repository';
import { UseRoomRepository } from './repositories/useRoom.repository';

@Module({
  providers: [
    UserRepository,
    UserFacebookRepository,
    UserAccessTokenRepository,
    UseCustomerRepository,
    UsePageRepository,
    UseRoomRepository,
  ],
  exports: [
    UserRepository,
    UserFacebookRepository,
    UserAccessTokenRepository,
    UseCustomerRepository,
    UsePageRepository,
    UseRoomRepository,
  ],
})
export class DatabaseModule {}
