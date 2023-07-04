-- CreateTable
CREATE TABLE `_DateEventToDayWeek` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DateEventToDayWeek_AB_unique`(`A`, `B`),
    INDEX `_DateEventToDayWeek_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
