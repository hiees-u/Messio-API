import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { TokenEncryptionService } from 'src/infrastructure/crypto/token-encryption.service';
import { PageDbDto } from '../dto/pageDb.dto';
import { PagesDto } from 'src/providers/facebook/dto/page.dto';

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

  private async getIdFacebookDbByFacebookId(facebookId: string) {
    const userFacebook = await this.prisma.userFacebook.findUnique({
      where: {
        facebookId,
      },
    });
    return userFacebook?.id;
  }

  async savePagesDb(id: string, pages: PagesDto[]) {
    try {
      const userFacebookId: number | undefined =
        await this.getIdFacebookDbByFacebookId(id);

      await this.prisma.faceBookPage.createMany({
        data: pages.map((page) => ({
          userFacebookId: userFacebookId || -1,
          pageId: page.id,
          name: page.name,
          tasks: page.tasks,
          token: this.tokenEncryption.encrypt(page.token),
        })),
        skipDuplicates: true,
      });
    } catch (error) {
      console.error('Error inserting pages into database:', error);
    }
  }
}
