import { Module } from '@nestjs/common';

import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

import { FacebookModule } from 'src/providers/facebook/facebook.module';
import { CryptoModule } from 'src/infrastructure/crypto/crypto.module';

import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';
import { UsePageRepository } from './repositories/usePage.repository';
import { SettingModule } from './setting/setting.module';
import { PageMapper } from './pages.mapper';

@Module({
  imports: [FacebookModule, CryptoModule, SettingModule],
  providers: [
    UserAccessTokenRepository,
    PagesService,
    UsePageRepository,
    PageMapper,
  ],
  controllers: [PagesController],
  exports: [UsePageRepository, PagesService],
})
export class PagesModule {}
