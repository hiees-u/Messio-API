-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "PageSetting" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isAlertEmail" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PageSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSpace" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkSpace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageSetting_pageId_key" ON "PageSetting"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkSpace_pageId_userId_key" ON "WorkSpace"("pageId", "userId");

-- AddForeignKey
ALTER TABLE "PageSetting" ADD CONSTRAINT "PageSetting_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "FaceBookPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpace" ADD CONSTRAINT "WorkSpace_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "FaceBookPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpace" ADD CONSTRAINT "WorkSpace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
