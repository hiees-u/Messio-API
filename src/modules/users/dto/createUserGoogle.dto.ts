import { Prisma } from 'src/generated/prisma/client';

export interface CreateUserGoogleRequestDto {
  name: string;
  email?: string;
  googleId: string;
  avataUrl?: string;
}

export type CreateUserGoogleResponseDto = Prisma.GoogleAuthGetPayload<{
  include: {
    user: true;
  };
}>;
