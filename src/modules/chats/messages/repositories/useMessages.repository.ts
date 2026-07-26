import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

import type { CreateMessageRequestDto } from '../dto/create-message.request.dto';

@Injectable()
export default class UseMessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(message: CreateMessageRequestDto, roomId: number) {
    return await this.prisma.messages.create({
      data: {
        mid: message.mid,
        roomId: roomId,
        senders: [],
        text: message.text,
        type: message.type,
      },
    });
  }

  async updateMessageSender(
    messageId: number,
    senders: number[],
  ): Promise<number[]> {
    return await this.prisma.$transaction(async (tx) => {
      let message = await tx.messages.findUnique({
        where: { id: messageId },
        select: { senders: true },
      });
      const sender = [...(message?.senders ?? []), ...senders];

      message = await tx.messages.update({
        where: { id: messageId },
        data: {
          senders: sender,
        },
      });

      return message.senders;
    });
  }
}
