import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

import type CreateUserDto from '../dto/createUserDto';
import type CreateUserFacebookDto from '../dto/createUserFacebookDto';

@Injectable()
export class UseUserReponsitory {
  constructor(private prisma: PrismaService) {}

  async upsertUserWithFacebook(
    user: CreateUserDto,
    userFacebookDto: CreateUserFacebookDto,
  ) {
    const userFacebook = await this.prisma.userFacebook.upsert({
      where: {
        facebookId: userFacebookDto.facebookId,
      },
      update: {
        name: user.name,
        email: user.email,
        picture: {
          upsert: {
            update: {
              url: userFacebookDto.url,
              height: userFacebookDto.height,
              width: userFacebookDto.width,
              isSilhouette: userFacebookDto.isSilhouette,
            },
            create: {
              url: userFacebookDto.url,
              height: userFacebookDto.height,
              width: userFacebookDto.width,
              isSilhouette: userFacebookDto.isSilhouette,
            },
          },
        },
        accessToken: {
          upsert: {
            update: {
              token: userFacebookDto.token,
              expiresAt: userFacebookDto.expiresAt,
            },
            create: {
              token: userFacebookDto.token,
              expiresAt: userFacebookDto.expiresAt,
            },
          },
        },
      },
      create: {
        facebookId: userFacebookDto.facebookId,
        name: userFacebookDto.name,
        email: userFacebookDto.email,
        user: {
          create: {
            name: userFacebookDto.name,
            email: userFacebookDto.email,
          },
        },
        picture: {
          create: {
            url: userFacebookDto.url,
            height: userFacebookDto.height,
            width: userFacebookDto.width,
            isSilhouette: userFacebookDto.isSilhouette,
          },
        },
        accessToken: {
          create: {
            token: userFacebookDto.token,
            expiresAt: userFacebookDto.expiresAt,
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
