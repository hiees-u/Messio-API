import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UseWorkSpaceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkSpaceForPage(pageId: number, users: number[]) {
    return await this.prisma.workSpace.createMany({
      data: users.map((user) => {
        return {
          pageId: pageId,
          userId: user,
        };
      }),
    });
  }
}
