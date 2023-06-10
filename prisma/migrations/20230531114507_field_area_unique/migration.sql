/*
  Warnings:

  - A unique constraint covering the columns `[area]` on the table `Text` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Text_area_key` ON `Text`(`area`);
