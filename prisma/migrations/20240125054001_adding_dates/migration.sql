/*
  Warnings:

  - You are about to drop the column `lastUpdatedDate` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `lastModifiedDate` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastModifiedDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Department` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastModifiedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `lastUpdatedDate`,
    ADD COLUMN `lastModifiedDate` DATETIME(3) NULL,
    MODIFY `submittedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `TicketCategory` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastModifiedDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastModifiedDate` DATETIME(3) NOT NULL;
