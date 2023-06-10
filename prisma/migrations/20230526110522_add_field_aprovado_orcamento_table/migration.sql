/*
  Warnings:

  - You are about to alter the column `conheceEspaco` on the `orcamento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `orcamento` ADD COLUMN `aprovado` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `conheceEspaco` BOOLEAN NOT NULL DEFAULT false;
