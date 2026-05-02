-- CreateTable
CREATE TABLE "UserAccessToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userFacebookId" INTEGER NOT NULL,

    CONSTRAINT "UserAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccessToken_token_key" ON "UserAccessToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccessToken_userFacebookId_key" ON "UserAccessToken"("userFacebookId");

-- AddForeignKey
ALTER TABLE "UserAccessToken" ADD CONSTRAINT "UserAccessToken_userFacebookId_fkey" FOREIGN KEY ("userFacebookId") REFERENCES "UserFacebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
