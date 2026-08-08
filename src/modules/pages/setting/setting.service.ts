import { Injectable } from '@nestjs/common';

import { SettingRepository } from './repositories/setting.repository';

import { CreateSettingRequestDto } from './dto/create-setting.request';
import { PageSetting } from 'src/generated/prisma/client';

@Injectable()
export class SettingService {
  constructor(private readonly settingRepository: SettingRepository) {}

  createSetting(setting: CreateSettingRequestDto) {
    return this.settingRepository.createSetting(setting);
  }

  async createDefaultSettingPages(pageIds: number[]): Promise<PageSetting[]> {
    return await this.settingRepository.createDefaultSettingPages(pageIds);
  }
}
