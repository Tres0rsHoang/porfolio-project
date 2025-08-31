-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Auth" (
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."RoleOnUser" (
    "roleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "authUserId" INTEGER,

    CONSTRAINT "RoleOnUser_pkey" PRIMARY KEY ("roleId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "public"."Role"("title");

-- AddForeignKey
ALTER TABLE "public"."Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoleOnUser" ADD CONSTRAINT "RoleOnUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoleOnUser" ADD CONSTRAINT "RoleOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoleOnUser" ADD CONSTRAINT "RoleOnUser_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "public"."Auth"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
