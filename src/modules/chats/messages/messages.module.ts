import { Module } from '@nestjs/common';

import { MessagesService } from './messages.service';
import UseMessagesRepository from './repositories/useMessages.repository';

@Module({
  providers: [MessagesService, UseMessagesRepository],
  exports: [MessagesService, UseMessagesRepository],
})
export class MessagesModule {}
