import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FacebookModule } from 'src/providers/facebook/facebook.module';
import { UseUserRepository } from '../users/repositories/useUser.repository';
import { AuthModuleCommon } from 'src/common/auth/auth.module';

@Module({
  imports: [FacebookModule, AuthModuleCommon],
  providers: [AuthService, UseUserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
