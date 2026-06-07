import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserFacebookRepository {
  constructor(private prisma: PrismaService) {}

  async getByFacebookId(facebookId: string) {
    const userFacebook = await this.prisma.userFacebook.findUnique({
      where: {
        facebookId,
      },
    });
    return userFacebook?.id;
  }

  async upsertUserWithFacebook(data: {
    name: string;
    email?: string;
    facebook: {
      id: string;
      name: string;
      email?: string;
      picture: {
        url: string;
        height: number;
        width: number;
        isSilhouette: boolean;
      };
      token: {
        token: string;
        expiresAt: Date;
      };
    };
  }) {
    const userFacebook = await this.prisma.userFacebook.upsert({
      where: {
        facebookId: data.facebook.id,
      },
      update: {
        name: data.facebook.name,
        email: data.facebook.email,
        picture: {
          upsert: {
            update: {
              url: data.facebook.picture.url,
              height: data.facebook.picture.height,
              width: data.facebook.picture.width,
              isSilhouette: data.facebook.picture.isSilhouette,
            },
            create: {
              url: data.facebook.picture.url,
              height: data.facebook.picture.height,
              width: data.facebook.picture.width,
              isSilhouette: data.facebook.picture.isSilhouette,
            },
          },
        },
        accessToken: {
          upsert: {
            update: {
              token: data.facebook.token.token,
              expiresAt: data.facebook.token.expiresAt,
            },
            create: {
              token: data.facebook.token.token,
              expiresAt: data.facebook.token.expiresAt,
            },
          },
        },
      },
      create: {
        facebookId: data.facebook.id,
        name: data.facebook.name,
        email: data.facebook.email,
        user: {
          create: {
            name: data.name,
            email: data.email,
          },
        },
        picture: {
          create: {
            url: data.facebook.picture.url,
            height: data.facebook.picture.height,
            width: data.facebook.picture.width,
            isSilhouette: data.facebook.picture.isSilhouette,
          },
        },
        accessToken: {
          create: {
            token: data.facebook.token.token,
            expiresAt: data.facebook.token.expiresAt,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return userFacebook.user;
  }
}
