import { Module } from '@nestjs/common';
import { FacebooksService } from './facebooks.service';
import { FacebooksController } from './facebooks.controller';

@Module({
  providers: [FacebooksService],
  controllers: [FacebooksController]
})
export class FacebooksModule {}
