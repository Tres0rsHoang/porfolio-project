/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Framework` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Framework` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Framework" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Framework_name_key" ON "Framework"("name");
