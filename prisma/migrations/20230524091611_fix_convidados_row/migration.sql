/*
  Warnings:

  - You are about to alter the column `convidados` on the `orcamento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `orcamento` MODIFY `convidados` INTEGER NOT NULL;
