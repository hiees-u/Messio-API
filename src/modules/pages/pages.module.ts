import { Module } from '@nestjs/common';

import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

import { FacebookModulee } from 'src/providers/facebook/facebook.module';
import { CryptoModule } from 'src/infrastructure/crypto/crypto.module';

import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';
import { UsePageRepository } from './repositories/usePage.repository';

@Module({
  imports: [FacebookModulee, CryptoModule],
  providers: [UserAccessTokenRepository, PagesService, UsePageRepository],
  controllers: [PagesController],
  exports: [UsePageRepository, PagesService],
})
export class PagesModule {}
