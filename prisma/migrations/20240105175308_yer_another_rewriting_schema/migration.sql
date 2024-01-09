/*
  Warnings:

  - You are about to drop the column `name` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ticketcategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentName]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryName]` on the table `TicketCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentName` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `TicketCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Department_name_key` ON `department`;

-- DropIndex
DROP INDEX `TicketCategory_name_key` ON `ticketcategory`;

-- AlterTable
ALTER TABLE `department` DROP COLUMN `name`,
    ADD COLUMN `departmentName` VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE `ticketcategory` DROP COLUMN `name`,
    ADD COLUMN `categoryName` VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Department_departmentName_key` ON `Department`(`departmentName`);

-- CreateIndex
CREATE UNIQUE INDEX `TicketCategory_categoryName_key` ON `TicketCategory`(`categoryName`);
