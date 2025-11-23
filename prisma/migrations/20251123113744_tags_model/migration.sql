-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_groupPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_pagePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_userPostId_fkey";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "OUserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "OPagePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "OGroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
