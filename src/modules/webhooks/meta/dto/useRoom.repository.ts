import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UseRoomRepository {
  constructor(private prisma: PrismaService) {}

  async findOrCreateRoom(pageId: number, customerId: number) {
    let existingRoom = await this.prisma.rooms.findUnique({
      where: {
        pageId_customerId: {
          pageId,
          customerId,
        },
      },
    });

    if (!existingRoom) {
      existingRoom = await this.prisma.rooms.create({
        data: {
          pageId,
          customerId,
        },
      });
    }

    return existingRoom;
  }
}
