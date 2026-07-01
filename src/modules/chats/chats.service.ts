import { Injectable } from '@nestjs/common';

import { PagesService } from '../pages/pages.service';
import { CustomerService } from './customer/customer.service';
import { FindOrCreateResult } from 'src/common/types/find-or-create-result.type';
import { CustomerDto } from './customer/dto/customer.dto';
import { RoomsService } from './rooms/rooms.service';
import { CreateMessageRequestDto } from './messages/dto/create-message.request.dto';
import { MessagesService } from './messages/messages.service';

@Injectable()
export class ChatsService {
  constructor(
    private readonly pagesService: PagesService,
    private readonly customerService: CustomerService,
    private readonly roomsService: RoomsService,
    private readonly messagesService: MessagesService,
  ) {}

  async handlerReceiveMessage(
    psidCusomer: string,
    pageId: string,
    message: CreateMessageRequestDto,
  ) {
    const pageRecipient = await this.pagesService.getPageDb(pageId);

    console.log('pageRecipient => ', pageRecipient);

    if (!pageRecipient) {
      return '';
    }

    const customerFindOrCreateResult: FindOrCreateResult<CustomerDto | null> =
      await this.customerService.findOrCreatePageCustomer(
        psidCusomer,
        pageRecipient?.token || null,
      );

    console.log('customerFindOrCreateResult => ', customerFindOrCreateResult);

    if (!customerFindOrCreateResult.data?.id) {
      return '';
    }

    const room = customerFindOrCreateResult.created
      ? await this.roomsService.createRoomDb(
          pageRecipient?.id,
          customerFindOrCreateResult.data?.id,
        )
      : await this.roomsService.getRoomDb(
          pageRecipient?.id,
          customerFindOrCreateResult.data?.id,
        );

    if (room !== null)
      await this.messagesService.createMessage(message, room.id);
  }
}
