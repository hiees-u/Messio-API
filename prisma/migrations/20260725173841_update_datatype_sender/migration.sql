/*
  Warnings:

  - You are about to drop the column `sender` on the `Messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "sender",
ADD COLUMN     "senders" INTEGER[];
