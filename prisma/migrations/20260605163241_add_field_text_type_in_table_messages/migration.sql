/*
  Warnings:

  - Added the required column `text` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
