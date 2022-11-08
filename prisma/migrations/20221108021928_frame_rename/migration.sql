/*
  Warnings:

  - You are about to drop the column `frames` on the `Dragoon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dragoon" DROP COLUMN "frames",
ADD COLUMN     "frame" INTEGER;
