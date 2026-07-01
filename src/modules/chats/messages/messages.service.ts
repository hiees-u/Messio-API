import { Injectable } from '@nestjs/common';
import UseMessagesRepository from './repositories/useMessages.repository';
import { CreateMessageRequestDto } from './dto/create-message.request.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly useMessagesRepository: UseMessagesRepository) {}

  async createMessage(message: CreateMessageRequestDto, roomId: number) {
    return await this.useMessagesRepository.createMessage(message, roomId);
  }
}
