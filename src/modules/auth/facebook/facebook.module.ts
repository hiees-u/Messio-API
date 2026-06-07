import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { FacebookService } from './facebook.service';
import { FacebookController } from './facebook.controller';
import { AuthModule } from 'src/common/auth/auth.module';
import { FacebooksModule } from 'src/modules/facebooks/facebooks.module';

@Module({
  imports: [HttpModule, AuthModule, FacebooksModule],
  controllers: [FacebookController],
  providers: [FacebookService],
  exports: [FacebookService],
})
export class FacebookModule {}
