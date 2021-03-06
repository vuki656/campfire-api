/*
  Warnings:

  - You are about to drop the column `siteFavicon` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "siteFavicon",
ADD COLUMN     "faviconLink" TEXT;
