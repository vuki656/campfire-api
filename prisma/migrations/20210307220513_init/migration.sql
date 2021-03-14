/*
  Warnings:

  - The migration will change the primary key for the `Favorite` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `Invite` table. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD PRIMARY KEY ("id");
