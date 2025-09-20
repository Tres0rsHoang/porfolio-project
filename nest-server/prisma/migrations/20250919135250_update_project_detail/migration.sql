-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "role" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "teamSize" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "title" SET DEFAULT '';

-- CreateTable
CREATE TABLE "public"."Link" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResponsibilityOnProject" (
    "responsibility" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ResponsibilityOnProject_pkey" PRIMARY KEY ("projectId","responsibility")
);

-- CreateTable
CREATE TABLE "public"."LinkOnProject" (
    "linkId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "LinkOnProject_pkey" PRIMARY KEY ("projectId","linkId")
);

-- AddForeignKey
ALTER TABLE "public"."ResponsibilityOnProject" ADD CONSTRAINT "ResponsibilityOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkOnProject" ADD CONSTRAINT "LinkOnProject_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkOnProject" ADD CONSTRAINT "LinkOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
