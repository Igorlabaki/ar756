/*
  Warnings:

  - Added the required column `contato` to the `orcamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orcamento` ADD COLUMN `contato` BOOLEAN NOT NULL;
