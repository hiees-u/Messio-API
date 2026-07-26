import { Injectable } from '@nestjs/common';

import { PagesService } from '../pages/pages.service';
import { CustomerService } from './customer/customer.service';
import { RoomsService } from './rooms/rooms.service';
import { MessagesService } from './messages/messages.service';
import { WebsocketService } from 'src/infrastructure/websocket/websocket.service';

import { FindOrCreateResult } from 'src/common/types/find-or-create-result.type';
import { CustomerDto } from './customer/dto/customer.dto';
import { CreateMessageRequestDto } from './messages/dto/create-message.request.dto';
import UseMessagesRepository from './messages/repositories/useMessages.repository';

@Injectable()
export class ChatsService {
  constructor(
    private readonly pagesService: PagesService,
    private readonly customerService: CustomerService,
    private readonly roomsService: RoomsService,
    private readonly messagesService: MessagesService,
    private readonly websocketService: WebsocketService,
    private readonly useMessagesRepository: UseMessagesRepository,
  ) {}

  async handlerReceiveMessage(
    psidCusomer: string,
    pageId: string,
    message: CreateMessageRequestDto,
  ) {
    const pageRecipient = await this.pagesService.getPageDb(pageId);

    if (!pageRecipient) {
      return '';
    }

    const customerFindOrCreateResult: FindOrCreateResult<CustomerDto | null> =
      await this.customerService.findOrCreatePageCustomer(
        psidCusomer,
        pageRecipient?.token || null,
      );

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

    if (room !== null) {
      //realtime: join room room-pageId-customerId -> send message to room
      await this.messagesService.createMessage(message, room.id);

      // nên tách ra thành 1 func riêng -> để apply logic check seened của client -> send emaill,....
      this.websocketService.sendMessageToRoom(
        `room-${pageRecipient.pageId}`,
        message.text,
      );
    }
  }

  async handlerSendedMessage(clientId: number, messagesId: number) {
    //verifi message thuộc page mà client này quản lý hay không?
    const mes: number[] = await this.useMessagesRepository.updateMessageSender(
      messagesId,
      [clientId],
    );
    return mes.includes(clientId);
  }
}
