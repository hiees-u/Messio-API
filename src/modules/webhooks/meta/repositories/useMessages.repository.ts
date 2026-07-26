import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

import type { MessagesCreate } from '../dto/message.create.dto';

@Injectable()
export class UseMessagesRepository {
  constructor(private prisma: PrismaService) {}

  async createMessages(messageInput: MessagesCreate) {
    const message = await this.prisma.messages.create({
      data: {
        mid: messageInput.mid,
        roomId: messageInput.roomId,
        senders: [],
        type: messageInput.type,
        text: messageInput.text,
      },
    });

    return message;
  }
}
