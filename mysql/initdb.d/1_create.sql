CREATE DATABASE IF NOT EXISTS flow;
USE flow;
-- CreateTable
CREATE TABLE `feeders` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `networkNum` INT NOT NULL,
    `feederNum` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `nodes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `feederId` INT NOT NULL,
    `num` INT NOT NULL,
    `posX` DECIMAL(65,30) NOT NULL,
    `posY` DECIMAL(65,30) NOT NULL,
    `hasLoad` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `lines` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `prevNodeId` INT NOT NULL,
    `nextNodeId` INT NOT NULL,
    `lengthM` DECIMAL(65,30) NOT NULL,
    `phase` INT NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `rOhmPerKm` DECIMAL(65,30) NOT NULL,
    `xOhmPerKm` DECIMAL(65,30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `load_samples` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `num` INT NOT NULL,
    `hour` INT NOT NULL,
    `minute` INT NOT NULL,
    `val` DECIMAL(65,30) NOT NULL,
    `season` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `pv_samples` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `num` INT NOT NULL,
    `hour` INT NOT NULL,
    `minute` INT NOT NULL,
    `val` DECIMAL(65,30) NOT NULL,
    `season` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `ehp_samples` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `num` INT NOT NULL,
    `hour` INT NOT NULL,
    `minute` INT NOT NULL,
    `val` DECIMAL(65,30) NOT NULL,
    `season` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uchp_samples` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `num` INT NOT NULL,
    `hour` INT NOT NULL,
    `minute` INT NOT NULL,
    `val` DECIMAL(65,30) NOT NULL,
    `season` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `nodes` ADD FOREIGN KEY (`feederId`) REFERENCES `feeders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `lines` ADD FOREIGN KEY (`prevNodeId`) REFERENCES `nodes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `lines` ADD FOREIGN KEY (`nextNodeId`) REFERENCES `nodes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

