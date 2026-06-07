/*
  Warnings:

  - A unique constraint covering the columns `[pageId,customerId]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rooms_pageId_customerId_key" ON "Rooms"("pageId", "customerId");
