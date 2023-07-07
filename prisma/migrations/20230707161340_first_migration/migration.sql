-- CreateTable
CREATE TABLE `orcamento` (
    `id` VARCHAR(191) NOT NULL,
    `trafegoCanal` VARCHAR(191) NOT NULL,
    `conheceEspaco` BOOLEAN NOT NULL DEFAULT false,
    `dataInicio` DATETIME(3) NOT NULL,
    `dataFim` DATETIME(3) NOT NULL,
    `seguranca` BOOLEAN NOT NULL,
    `limpeza` BOOLEAN NOT NULL,
    `recepcionista` BOOLEAN NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `texto` LONGTEXT NOT NULL,
    `convidados` INTEGER NOT NULL,
    `valorBase` DOUBLE NOT NULL,
    `qtdHorasExtras` INTEGER NOT NULL,
    `valorHoraExtra` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `aprovadoCliente` BOOLEAN NOT NULL DEFAULT false,
    `aprovadoAr756` BOOLEAN NOT NULL DEFAULT false,
    `feedback` LONGTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `contato` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `imageUrl` LONGTEXT NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `legenda` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Text` (
    `id` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `text` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DateEvent` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL,
    `dataFim` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `orcamentoId` VARCHAR(191) NULL,

    INDEX `DateEvent_orcamentoId_idx`(`orcamentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
