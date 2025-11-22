/*
  Warnings:

  - Added the required column `owner` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sharer` to the `ToGroupSharePost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ToGroupSharerType" AS ENUM ('user', 'page');

-- CreateEnum
CREATE TYPE "MediaOwnerType" AS ENUM ('user', 'page', 'group');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('oUserPost', 'oPagePost', 'oGroupPost', 'userSharePost', 'pageSharePost', 'toGroupSharedPost');

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "profilePicture" TEXT;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "owner" "MediaOwnerType" NOT NULL;

-- AlterTable
ALTER TABLE "OGroupPost" ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'oGroupPost';

-- AlterTable
ALTER TABLE "OPagePost" ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'oPagePost';

-- AlterTable
ALTER TABLE "OUserPost" ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'oUserPost';

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "profilePicture" TEXT;

-- AlterTable
ALTER TABLE "PageSharePost" ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'pageSharePost';

-- AlterTable
ALTER TABLE "ToGroupSharePost" ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'toGroupSharedPost',
ADD COLUMN     "sharer" "ToGroupSharerType" NOT NULL;

-- AlterTable
ALTER TABLE "UserSharePost" ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'userSharePost';
