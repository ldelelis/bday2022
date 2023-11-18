/*
  Warnings:

  - You are about to drop the column `isApproved` on the `DragoonComment` table. All the data in the column will be lost.
  - You are about to drop the column `originIp` on the `DragoonComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DragoonComment" DROP COLUMN "isApproved",
DROP COLUMN "originIp";
