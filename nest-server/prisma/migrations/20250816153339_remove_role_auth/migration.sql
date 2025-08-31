/*
  Warnings:

  - You are about to drop the column `authUserId` on the `RoleOnUser` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RoleOnUser" DROP CONSTRAINT "RoleOnUser_authUserId_fkey";

-- AlterTable
ALTER TABLE "public"."RoleOnUser" DROP COLUMN "authUserId";
