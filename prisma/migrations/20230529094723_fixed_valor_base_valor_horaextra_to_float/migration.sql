/*
  Warnings:

  - You are about to alter the column `total` on the `orcamento` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `valorBase` on the `orcamento` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `orcamento` MODIFY `total` DOUBLE NOT NULL,
    MODIFY `valorBase` DOUBLE NOT NULL;
