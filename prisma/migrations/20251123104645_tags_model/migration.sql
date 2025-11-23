-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ToGroupSharePost" DROP CONSTRAINT "ToGroupSharePost_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
