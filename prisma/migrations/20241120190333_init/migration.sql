-- AlterTable
ALTER TABLE "ChatRoom" ADD COLUMN     "tempUserId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;
