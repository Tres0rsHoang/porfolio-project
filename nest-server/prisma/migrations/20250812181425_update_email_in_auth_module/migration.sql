/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Auth" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_username_key" ON "public"."Auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "public"."Auth"("email");
