/*
  Warnings:

  - You are about to drop the column `is_silhouette` on the `PictureUserFacebook` table. All the data in the column will be lost.
  - Added the required column `isSilhouette` to the `PictureUserFacebook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PictureUserFacebook" DROP COLUMN "is_silhouette",
ADD COLUMN     "isSilhouette" BOOLEAN NOT NULL;
