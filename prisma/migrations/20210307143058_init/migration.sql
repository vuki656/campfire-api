/*
  Warnings:

  - The migration will change the primary key for the `Invite` table. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `toUserId` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromUserId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_pkey",
ADD COLUMN     "toUserId" TEXT NOT NULL,
ADD COLUMN     "fromUserId" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ADD PRIMARY KEY ("toUserId", "groupId");

-- AddForeignKey
ALTER TABLE "Invite" ADD FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
