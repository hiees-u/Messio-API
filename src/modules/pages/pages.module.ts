import { Module } from '@nestjs/common';

import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

import { FacebookModule } from 'src/providers/facebook/facebook.module';
import { CryptoModule } from 'src/infrastructure/crypto/crypto.module';

import { UserAccessTokenRepository } from './repositories/userAccessToken.repository';
import { UsePageRepository } from './repositories/usePage.repository';
import { SettingModule } from './setting/setting.module';
import { PageMapper } from './pages.mapper';
// import { PermissionGuard } from 'src/common/auth/guards/permission.guard';
import { UsersModule } from '../users/users.module';
import { WorkSpaceModule } from './work-space/work-space.module';

@Module({
  imports: [
    FacebookModule,
    CryptoModule,
    SettingModule,
    UsersModule,
    WorkSpaceModule,
  ],
  providers: [
    UserAccessTokenRepository,
    PagesService,
    UsePageRepository,
    // PermissionGuard,
    PageMapper,
  ],
  controllers: [PagesController],
  exports: [UsePageRepository, PagesService],
})
export class PagesModule {}
