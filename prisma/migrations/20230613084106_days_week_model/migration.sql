-- CreateTable
CREATE TABLE `DayWeek` (
    `id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `dateEventId` VARCHAR(191) NULL,

    INDEX `DayWeek_dateEventId_idx`(`dateEventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
