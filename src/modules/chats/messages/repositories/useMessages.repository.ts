import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export default class UseMessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getRoom(pageId: number, customerId: number) {
    return this.prisma.rooms.findUnique({
      where: {
        pageId_customerId: {
          pageId,
          customerId,
        },
      },
    });
  }
}
