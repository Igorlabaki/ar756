/*
  Warnings:

  - You are about to drop the `data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `data`;

-- CreateTable
CREATE TABLE `Date` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `orcamentoId` VARCHAR(191) NULL,

    INDEX `Date_orcamentoId_idx`(`orcamentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
