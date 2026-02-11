/*
  Warnings:

  - You are about to drop the column `endTime` on the `TaskTracker` table. All the data in the column will be lost.
  - Added the required column `pauseTime` to the `TaskTracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskTracker" DROP COLUMN "endTime",
ADD COLUMN     "pauseTime" TIMESTAMP(3) NOT NULL;
