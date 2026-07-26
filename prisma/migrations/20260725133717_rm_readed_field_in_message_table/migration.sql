/*
  Warnings:

  - You are about to drop the column `readed` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `sended` on the `Messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "readed",
DROP COLUMN "sended",
ADD COLUMN     "sender" TEXT[];
