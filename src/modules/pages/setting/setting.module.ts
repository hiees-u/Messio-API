import { Module } from '@nestjs/common';

import { SettingService } from './setting.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

import { SettingRepository } from './repositories/setting.repository';

@Module({
  imports: [PrismaModule],
  providers: [SettingService, SettingRepository],
  exports: [SettingService],
})
export class SettingModule {}
