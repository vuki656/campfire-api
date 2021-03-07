/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PostMetadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PostMetadata" DROP COLUMN "createdAt";
