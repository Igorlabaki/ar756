/*
  Warnings:

  - Added the required column `feedback` to the `orcamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orcamento` ADD COLUMN `feedback` LONGTEXT NOT NULL,
    MODIFY `texto` LONGTEXT NOT NULL;
