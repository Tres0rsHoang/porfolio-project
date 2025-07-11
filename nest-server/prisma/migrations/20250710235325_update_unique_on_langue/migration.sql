/*
  Warnings:

  - A unique constraint covering the columns `[displayString]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Language_displayString_key" ON "Language"("displayString");
