import { Injectable } from '@nestjs/common';

import { PagesService } from '../pages/pages.service';
import { CustomerService } from './customer/customer.service';
import { FindOrCreateResult } from 'src/common/types/find-or-create-result.type';
import { CustomerDto } from './customer/dto/customer.dto';
import { RoomsService } from './rooms/rooms.service';

@Injectable()
export class ChatsService {
  constructor(
    private readonly pagesService: PagesService,
    private readonly customerService: CustomerService,
    private readonly roomsService: RoomsService,
  ) {}

  async handlerReceiveMessage(psidCusomer: string, pageId: string) {
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

    console.log(room);
    //create Messages
  }
}
