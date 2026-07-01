import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { MessagesCreate } from '../dto/message.create.dto';

@Injectable()
export class UseMessagesRepository {
  constructor(private prisma: PrismaService) {}

  async createMessages(messageInput: MessagesCreate) {
    const message = await this.prisma.messages.create({
      data: {
        mid: messageInput.mid,
        roomId: messageInput.roomId,
        readed: false,
        type: messageInput.type,
        text: messageInput.text,
      },
    });

    return message;
  }
}
