/*
  Warnings:

  - You are about to drop the column `horarioFim` on the `dateevent` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `dateevent` table. All the data in the column will be lost.
  - Added the required column `dataFim` to the `DateEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `DateEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dateevent` DROP COLUMN `horarioFim`,
    DROP COLUMN `horarioInicio`,
    ADD COLUMN `dataFim` DATETIME(3) NOT NULL,
    ADD COLUMN `dataInicio` DATETIME(3) NOT NULL;
