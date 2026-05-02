import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserFacebookRepository } from './repositories/userFacebook.repository';

@Module({
  providers: [UserRepository, UserFacebookRepository],
  exports: [UserRepository, UserFacebookRepository],
})
export class DatabaseModule {}
