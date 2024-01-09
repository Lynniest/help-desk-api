/*
  Warnings:

  - Made the column `userToken` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `userToken` VARCHAR(64) NOT NULL;
