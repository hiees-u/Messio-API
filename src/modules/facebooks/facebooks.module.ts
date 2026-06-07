import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { FacebooksService } from './facebooks.service';
import { FacebooksController } from './facebooks.controller';
import { CryptoModule } from 'src/common/crypto/crypto.module';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { UseFacebookReponsitory } from './repositories/useFacebook.repository';
import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';

@Module({
  imports: [CryptoModule, HttpModule],
  providers: [
    FacebooksService,
    UseFacebookReponsitory,
    UserAccessTokenRepository,
    PrismaService,
  ],
  controllers: [FacebooksController],
  exports: [UseFacebookReponsitory, UserAccessTokenRepository],
})
export class FacebooksModule {}
