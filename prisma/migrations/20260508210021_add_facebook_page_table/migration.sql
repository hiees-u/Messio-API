-- CreateTable
CREATE TABLE "FaceBookPage" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "facebookPageId" TEXT NOT NULL,
    "task" TEXT[],
    "userFacebookId" INTEGER NOT NULL,

    CONSTRAINT "FaceBookPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FaceBookPage_token_key" ON "FaceBookPage"("token");

-- CreateIndex
CREATE UNIQUE INDEX "FaceBookPage_facebookPageId_key" ON "FaceBookPage"("facebookPageId");

-- AddForeignKey
ALTER TABLE "FaceBookPage" ADD CONSTRAINT "FaceBookPage_userFacebookId_fkey" FOREIGN KEY ("userFacebookId") REFERENCES "UserFacebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
