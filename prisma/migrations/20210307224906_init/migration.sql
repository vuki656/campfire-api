/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `siteName` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageLink` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `faviconLink` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postMetadataId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdAt",
DROP COLUMN "title",
DROP COLUMN "siteName",
DROP COLUMN "imageLink",
DROP COLUMN "faviconLink",
ADD COLUMN     "postMetadataId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PostMetadata" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "siteName" TEXT,
    "faviconLink" TEXT,
    "imageLink" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("postMetadataId") REFERENCES "PostMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
