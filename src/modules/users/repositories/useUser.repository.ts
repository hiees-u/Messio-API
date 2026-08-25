import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

import type CreateUserDto from '../dto/createUserDto';
import type { CreateUserFacebookRequestDto } from '../dto/createUserFacebookDto';
import {
  CreateUserGoogleRequestDto,
  CreateUserGoogleResponseDto,
} from '../dto/createUserGoogle.dto';

@Injectable()
export class UseUserRepository {
  constructor(private prisma: PrismaService) {}

  async upsertUserWithFacebook(
    user: CreateUserDto,
    userFacebookDto: CreateUserFacebookRequestDto,
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

  async findUserWithGoogleId(googleId: string) {
    const use = await this.prisma.googleAuth.findUnique({
      where: {
        googleId,
      },
      select: {
        googleId: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return use;
  }

  async upsertUserWithGoogleAuth(
    userGoogle: CreateUserGoogleRequestDto,
  ): Promise<CreateUserGoogleResponseDto> {
    const upsertUser = {
      email: userGoogle.email,
      name: userGoogle.name,
    };

    const user: CreateUserGoogleResponseDto =
      await this.prisma.googleAuth.upsert({
        where: {
          googleId: userGoogle.googleId,
        },
        update: {
          avataUrl: userGoogle.avataUrl,
          user: {
            upsert: {
              update: upsertUser,
              create: upsertUser,
            },
          },
        },
        create: {
          googleId: userGoogle.googleId,
          avataUrl: userGoogle.avataUrl || '',
          user: {
            create: upsertUser,
          },
        },
        include: {
          user: true,
        },
      });

    return user;
  }

  async existUserFacebook(userId: number) {
    return !!(await this.prisma.userFacebook.findFirst({
      where: {
        userId: userId,
      },
    }));
  }
}
