import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Module({
  imports: [],
  exports: [ChatsService],
  providers: [ChatsService],
})
export class ChatsModule {}
