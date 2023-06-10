/*
  Warnings:

  - Added the required column `qtdHorasExtras` to the `orcamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `orcamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorBase` to the `orcamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorHoraExtra` to the `orcamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orcamento` ADD COLUMN `qtdHorasExtras` INTEGER NOT NULL,
    ADD COLUMN `total` INTEGER NOT NULL,
    ADD COLUMN `valorBase` INTEGER NOT NULL,
    ADD COLUMN `valorHoraExtra` INTEGER NOT NULL;
