import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { FacebooksService } from './facebooks.service';
import { FacebooksController } from './facebooks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CryptoModule } from 'src/common/crypto/crypto.module';

@Module({
  imports: [DatabaseModule, CryptoModule, HttpModule],
  providers: [FacebooksService],
  controllers: [FacebooksController],
})
export class FacebooksModule {}
