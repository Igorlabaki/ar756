/*
  Warnings:

  - You are about to drop the column `number` on the `dayweek` table. All the data in the column will be lost.
  - Added the required column `code` to the `DayWeek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dia` to the `DayWeek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dayweek` DROP COLUMN `number`,
    ADD COLUMN `code` INTEGER NOT NULL,
    ADD COLUMN `dia` VARCHAR(191) NOT NULL;
