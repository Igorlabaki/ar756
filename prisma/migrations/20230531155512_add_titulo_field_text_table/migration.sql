/*
  Warnings:

  - Added the required column `titulo` to the `Text` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Text_area_key` ON `text`;

-- AlterTable
ALTER TABLE `text` ADD COLUMN `titulo` VARCHAR(191) NOT NULL;
