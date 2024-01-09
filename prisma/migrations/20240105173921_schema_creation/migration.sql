-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(64) NOT NULL,
    `lastName` VARCHAR(64) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `phoneNo` VARCHAR(15) NOT NULL,
    `userType` ENUM('User', 'Employee', 'Adminstrator') NOT NULL DEFAULT 'User',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `title` VARCHAR(64) NOT NULL,
    `submittedDate` DATETIME(3) NOT NULL,
    `startDate` DATETIME(3) NULL,
    `lastUpdatedDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `issuerId` INTEGER NOT NULL,
    `assigneeId` INTEGER NULL,
    `departmentId` INTEGER NOT NULL,
    `status` ENUM('Pending', 'Open', 'In_Progress', 'Closed') NOT NULL DEFAULT 'Pending',
    `priority` ENUM('Critical', 'Moderate', 'Medium', 'Low') NOT NULL DEFAULT 'Low',

    UNIQUE INDEX `Ticket_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `Department_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `TicketCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `TicketCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_issuerId_fkey` FOREIGN KEY (`issuerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_assigneeId_fkey` FOREIGN KEY (`assigneeId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
