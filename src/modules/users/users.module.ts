import { Module } from '@nestjs/common';
import { UseUserRepository } from './repositories/useUser.repository';

@Module({
  providers: [UseUserRepository],
  exports: [UseUserRepository],
})
export class UsersModule {}
