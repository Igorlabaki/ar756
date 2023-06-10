/*
  Warnings:

  - You are about to drop the column `dataFim` on the `dateevent` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `dateevent` table. All the data in the column will be lost.
  - Added the required column `data` to the `DateEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioFim` to the `DateEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioInicio` to the `DateEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dateevent` DROP COLUMN `dataFim`,
    DROP COLUMN `dataInicio`,
    ADD COLUMN `data` VARCHAR(191) NOT NULL,
    ADD COLUMN `horarioFim` VARCHAR(191) NOT NULL,
    ADD COLUMN `horarioInicio` VARCHAR(191) NOT NULL;
