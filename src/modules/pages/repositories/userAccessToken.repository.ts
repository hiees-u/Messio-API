import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserAccessTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getToken(userFacebookId: string) {
    const token = await this.prisma.userAccessToken.findFirst({
      where: {
        userFacebook: {
          facebookId: userFacebookId,
        },
      },
    });

    return token;
  }
}
