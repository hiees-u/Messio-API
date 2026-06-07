import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MessagesCreate } from 'src/modules/facebooks/dto/message.create.dto';

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
