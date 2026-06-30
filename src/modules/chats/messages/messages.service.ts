import { Injectable } from '@nestjs/common';
import UseMessagesRepository from './repositories/useMessages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly useMessagesRepository: UseMessagesRepository) {}

  async getRoom(pageId: number, customerId: number) {
    return await this.useMessagesRepository.getRoom(pageId, customerId);
  }
}
