-- CreateTable
CREATE TABLE `Text` (
    `id` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `text` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
