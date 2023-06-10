/*
  Warnings:

  - You are about to drop the column `data` on the `dateevent` table. All the data in the column will be lost.
  - Added the required column `dataFim` to the `DateEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `DateEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dateevent` DROP COLUMN `data`,
    ADD COLUMN `dataFim` VARCHAR(191) NOT NULL,
    ADD COLUMN `dataInicio` VARCHAR(191) NOT NULL;
