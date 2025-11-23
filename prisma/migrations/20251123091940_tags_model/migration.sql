-- DropForeignKey
ALTER TABLE "public"."Feed" DROP CONSTRAINT "Feed_groupPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feed" DROP CONSTRAINT "Feed_pagePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feed" DROP CONSTRAINT "Feed_userPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GroupPost" DROP CONSTRAINT "GroupPost_oGroupPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GroupPost" DROP CONSTRAINT "GroupPost_toGroupSharePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PagePost" DROP CONSTRAINT "PagePost_oPagePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PagePost" DROP CONSTRAINT "PagePost_pageSharePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserPost" DROP CONSTRAINT "UserPost_oUserPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserPost" DROP CONSTRAINT "UserPost_userSharePostId_fkey";

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_oUserPostId_fkey" FOREIGN KEY ("oUserPostId") REFERENCES "OUserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userSharePostId_fkey" FOREIGN KEY ("userSharePostId") REFERENCES "UserSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPost" ADD CONSTRAINT "GroupPost_oGroupPostId_fkey" FOREIGN KEY ("oGroupPostId") REFERENCES "OGroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPost" ADD CONSTRAINT "GroupPost_toGroupSharePostId_fkey" FOREIGN KEY ("toGroupSharePostId") REFERENCES "ToGroupSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePost" ADD CONSTRAINT "PagePost_oPagePostId_fkey" FOREIGN KEY ("oPagePostId") REFERENCES "OPagePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePost" ADD CONSTRAINT "PagePost_pageSharePostId_fkey" FOREIGN KEY ("pageSharePostId") REFERENCES "PageSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "UserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "PagePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
