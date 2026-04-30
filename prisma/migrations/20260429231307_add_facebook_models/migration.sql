/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserFacebook" (
    "id" SERIAL NOT NULL,
    "facebookId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "userId" INTEGER,

    CONSTRAINT "UserFacebook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PictureUserFacebook" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "is_silhouette" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "userFacebookId" INTEGER NOT NULL,

    CONSTRAINT "PictureUserFacebook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFacebook_facebookId_key" ON "UserFacebook"("facebookId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFacebook_email_key" ON "UserFacebook"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PictureUserFacebook_userFacebookId_key" ON "PictureUserFacebook"("userFacebookId");

-- AddForeignKey
ALTER TABLE "UserFacebook" ADD CONSTRAINT "UserFacebook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PictureUserFacebook" ADD CONSTRAINT "PictureUserFacebook_userFacebookId_fkey" FOREIGN KEY ("userFacebookId") REFERENCES "UserFacebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
