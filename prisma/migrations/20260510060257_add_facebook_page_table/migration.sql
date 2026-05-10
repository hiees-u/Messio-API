/*
  Warnings:

  - You are about to drop the column `facebookPageId` on the `FaceBookPage` table. All the data in the column will be lost.
  - You are about to drop the column `task` on the `FaceBookPage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pageId]` on the table `FaceBookPage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageId` to the `FaceBookPage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FaceBookPage_facebookPageId_key";

-- AlterTable
ALTER TABLE "FaceBookPage" DROP COLUMN "facebookPageId",
DROP COLUMN "task",
ADD COLUMN     "pageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FaceBookPage_pageId_key" ON "FaceBookPage"("pageId");
