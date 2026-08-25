import { Prisma } from 'src/generated/prisma/client';

/**
 * type create UserFacebook & UserAccessToken & PictureUserFacebook
 */
type CreateUserFacebookRequestDto = {
  facebookId: string;
  name: string;
  email?: string;

  token: string;
  expiresAt: Date;

  url: string;
  height: number;
  width: number;
  isSilhouette: boolean;
};

type CreateUserFacebookResponseDto = Prisma.UserFacebookGetPayload<{
  include: {
    user: true;
  };
}>;

export type { CreateUserFacebookRequestDto, CreateUserFacebookResponseDto };
