import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByFacebookId(facebookId: string) {
    return await this.prisma.user.findFirst({
      where: {
        facebookAccounts: {
          some: {
            facebookId,
          },
        },
      },
    });
  }
}
