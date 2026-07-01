import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { RoomsModule } from './rooms/rooms.module';
import { PagesModule } from '../pages/pages.module';
import { CustomerModule } from './customer/customer.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [RoomsModule, PagesModule, CustomerModule, MessagesModule],
  exports: [ChatsService],
  providers: [ChatsService],
})
export class ChatsModule {}
