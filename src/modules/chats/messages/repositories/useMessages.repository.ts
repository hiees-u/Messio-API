import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateMessageRequestDto } from '../dto/create-message.request.dto';

@Injectable()
export default class UseMessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(message: CreateMessageRequestDto, roomId: number) {
    return await this.prisma.messages.create({
      data: {
        mid: message.mid,
        roomId: roomId,
        readed: false,
        text: message.text,
        type: message.type,
      },
    });
  }
}
