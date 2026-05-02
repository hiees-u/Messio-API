import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { FacebookService } from './facebook.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [FacebookService],
  exports: [FacebookService],
})
export class FacebookModule {}
