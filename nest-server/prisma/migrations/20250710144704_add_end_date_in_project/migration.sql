/*
  Warnings:

  - Added the required column `endAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL;
