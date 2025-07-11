/*
  Warnings:

  - Added the required column `displayString` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "displayString" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "endAt" DROP NOT NULL;
