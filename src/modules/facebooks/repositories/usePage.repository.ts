import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PageDbDto } from '../dto/pageDb.dto';
import { TokenEncryptionService } from 'src/common/crypto/token-encryption.service';

@Injectable()
export class UsePageRepository {
  constructor(
    private prisma: PrismaService,
    private readonly tokenEncryption: TokenEncryptionService,
  ) {}

  async getPageDb(pageId: string) {
    const page: PageDbDto | null = await this.prisma.faceBookPage.findUnique({
      where: {
        pageId,
      },
    });

    return page
      ? {
          ...page,
          token: this.tokenEncryption.decrypt(page.token),
        }
      : null;
  }
}
