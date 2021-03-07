/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[postId]` on the table `PostMetadata`. If there are existing duplicate values, the migration will fail.
  - Added the required column `postId` to the `PostMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postMetadataId_fkey";

-- AlterTable
ALTER TABLE "PostMetadata" ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PostMetadata_postId_unique" ON "PostMetadata"("postId");

-- AddForeignKey
ALTER TABLE "PostMetadata" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
