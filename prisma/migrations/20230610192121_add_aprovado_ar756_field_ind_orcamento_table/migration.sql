/*
  Warnings:

  - You are about to drop the column `aprovado` on the `orcamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orcamento` DROP COLUMN `aprovado`,
    ADD COLUMN `aprovadoAr756` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `aprovadoCliente` BOOLEAN NOT NULL DEFAULT false;
