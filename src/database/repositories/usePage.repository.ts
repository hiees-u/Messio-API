import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UsePageRepository {
  constructor(private prisma: PrismaService) {}

  async findPage(pageId: string) {
    const page = await this.prisma.faceBookPage.findUnique({
      where: {
        pageId: pageId,
      },
    });

    return page;
  }
}
