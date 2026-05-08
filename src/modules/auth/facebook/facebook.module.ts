import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { FacebookService } from './facebook.service';
import { DatabaseModule } from 'src/database/database.module';
import { FacebookController } from './facebook.controller';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [HttpModule, DatabaseModule, AuthModule],
  controllers: [FacebookController],
  providers: [FacebookService],
  exports: [FacebookService],
})
export class FacebookModule {}
