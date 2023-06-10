/*
  Warnings:

  - You are about to alter the column `valorHoraExtra` on the `orcamento` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `orcamento` MODIFY `valorHoraExtra` DOUBLE NOT NULL;
