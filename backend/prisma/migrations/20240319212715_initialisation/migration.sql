-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `motDePasse` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `idUtilisateur` INTEGER NULL,
    `reserve` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Salle` ADD CONSTRAINT `Salle_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
