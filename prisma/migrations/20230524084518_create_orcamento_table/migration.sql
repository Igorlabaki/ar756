-- CreateTable
CREATE TABLE `orcamento` (
    `id` VARCHAR(191) NOT NULL,
    `trafegoCanal` VARCHAR(191) NOT NULL,
    `conheceEspaco` VARCHAR(191) NOT NULL,
    `horarioFim` VARCHAR(191) NOT NULL,
    `dataInicio` VARCHAR(191) NOT NULL,
    `horarioInicio` VARCHAR(191) NOT NULL,
    `seguranca` BOOLEAN NOT NULL,
    `limpeza` BOOLEAN NOT NULL,
    `recepcionista` BOOLEAN NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `texto` VARCHAR(191) NOT NULL,
    `convidados` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
