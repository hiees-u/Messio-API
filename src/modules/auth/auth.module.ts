import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FacebookModulee } from 'src/providers/facebook/facebook.module';
import { UseUserReponsitory } from '../users/repositories/useUser.repository';
import { AuthModuleCommon } from 'src/common/auth/auth.module';

@Module({
  imports: [FacebookModulee, AuthModuleCommon],
  providers: [AuthService, UseUserReponsitory],
  controllers: [AuthController],
})
export class AuthModule {}
