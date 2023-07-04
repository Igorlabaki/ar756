/*
  Warnings:

  - You are about to drop the column `horarioInicio` on the `orcamento` table. All the data in the column will be lost.
  - You are about to alter the column `dataInicio` on the `orcamento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Added the required column `dataFim` to the `orcamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orcamento` DROP COLUMN `horarioInicio`,
    ADD COLUMN `dataFim` DATETIME(3) NOT NULL,
    MODIFY `dataInicio` DATETIME(3) NOT NULL;
