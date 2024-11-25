/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Report` table. All the data in the column will be lost.
  - Added the required column `messages` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "updatedAt",
ADD COLUMN     "messages" JSONB NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL,
ALTER COLUMN "conversationId" DROP NOT NULL;
