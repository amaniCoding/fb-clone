/*
  Warnings:

  - You are about to drop the column `recieverId` on the `Firends` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Firends` table. All the data in the column will be lost.
  - You are about to drop the column `groupMembersId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `GroupRules` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `MessageMedias_PAGE` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `MessageMedias_PAGE` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `MessageMedias_PAGE` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `MessageMedias_PAGE` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `MessageMedias_USER` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `MessageMedias_USER` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `MessageMedias_USER` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `MessageMedias_USER` table. All the data in the column will be lost.
  - You are about to drop the `CommentReaction_PAGEREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReaction_PAGESHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReaction_USERREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReaction_USERSHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReactions_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReactions_GROUP_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReactions_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReactions_PAGESHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReactions_PAGE_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReactions_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReactions_USERSHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReactions_USER_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_GROUP_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_PAGEREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_PAGESHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_PAGESHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_PAGE_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_USERREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_USERSHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_USERSHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment_USER_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medias_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medias_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medias_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReaction_PAGEREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_GROUP_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_PAGESHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_PAGESHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_PAGE_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_USERREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_USERSHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_USERSHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReactions_USER_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_PAGESHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_PAGESHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_USERSHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_USERSHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reel_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reel_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_GROUP_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_PAGEREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_PAGESHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_PAGESHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_PAGE_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_USERREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_USERSHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_USERSHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyReactions_USER_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_GROUP_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_PAGEREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_PAGESHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_PAGESHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_PAGE_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_USERREEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_USERSHARE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_USERSHARE_TOGROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply_USER_MEDIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLinks_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLinks_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryMedia_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryMedia_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Websites_GROUP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Websites_PAGE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PageToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_USERToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_moderators` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Firends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `GroupRules` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `MessageMedias_PAGE` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `MessageMedias_USER` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MessageMediaType" AS ENUM ('image', 'video', 'document');

-- DropForeignKey
ALTER TABLE "public"."Collges_USER" DROP CONSTRAINT "Collges_USER_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReaction_PAGEREEL" DROP CONSTRAINT "CommentReaction_PAGEREEL_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReaction_PAGEREEL" DROP CONSTRAINT "CommentReaction_PAGEREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReaction_PAGESHARE_TOGROUP" DROP CONSTRAINT "CommentReaction_PAGESHARE_TOGROUP_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReaction_PAGESHARE_TOGROUP" DROP CONSTRAINT "CommentReaction_PAGESHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReaction_USERREEL" DROP CONSTRAINT "CommentReaction_USERREEL_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReaction_USERREEL" DROP CONSTRAINT "CommentReaction_USERREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReaction_USERSHARE_TOGROUP" DROP CONSTRAINT "CommentReaction_USERSHARE_TOGROUP_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReaction_USERSHARE_TOGROUP" DROP CONSTRAINT "CommentReaction_USERSHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_GROUP" DROP CONSTRAINT "CommentReactions_GROUP_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_GROUP" DROP CONSTRAINT "CommentReactions_GROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_GROUP_MEDIA" DROP CONSTRAINT "CommentReactions_GROUP_MEDIA_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_GROUP_MEDIA" DROP CONSTRAINT "CommentReactions_GROUP_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_PAGE" DROP CONSTRAINT "CommentReactions_PAGE_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_PAGE" DROP CONSTRAINT "CommentReactions_PAGE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_PAGESHARE" DROP CONSTRAINT "CommentReactions_PAGESHARE_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_PAGESHARE" DROP CONSTRAINT "CommentReactions_PAGESHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_PAGE_MEDIA" DROP CONSTRAINT "CommentReactions_PAGE_MEDIA_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_PAGE_MEDIA" DROP CONSTRAINT "CommentReactions_PAGE_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_USER" DROP CONSTRAINT "CommentReactions_USER_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_USER" DROP CONSTRAINT "CommentReactions_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_USERSHARE" DROP CONSTRAINT "CommentReactions_USERSHARE_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_USERSHARE" DROP CONSTRAINT "CommentReactions_USERSHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_USER_MEDIA" DROP CONSTRAINT "CommentReactions_USER_MEDIA_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommentReactions_USER_MEDIA" DROP CONSTRAINT "CommentReactions_USER_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_GROUP" DROP CONSTRAINT "Comment_GROUP_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_GROUP" DROP CONSTRAINT "Comment_GROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_GROUP_MEDIA" DROP CONSTRAINT "Comment_GROUP_MEDIA_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_GROUP_MEDIA" DROP CONSTRAINT "Comment_GROUP_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGE" DROP CONSTRAINT "Comment_PAGE_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGE" DROP CONSTRAINT "Comment_PAGE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGEREEL" DROP CONSTRAINT "Comment_PAGEREEL_reelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGEREEL" DROP CONSTRAINT "Comment_PAGEREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGESHARE" DROP CONSTRAINT "Comment_PAGESHARE_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGESHARE" DROP CONSTRAINT "Comment_PAGESHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGESHARE_TOGROUP" DROP CONSTRAINT "Comment_PAGESHARE_TOGROUP_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGESHARE_TOGROUP" DROP CONSTRAINT "Comment_PAGESHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGE_MEDIA" DROP CONSTRAINT "Comment_PAGE_MEDIA_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_PAGE_MEDIA" DROP CONSTRAINT "Comment_PAGE_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USER" DROP CONSTRAINT "Comment_USER_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USER" DROP CONSTRAINT "Comment_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USERREEL" DROP CONSTRAINT "Comment_USERREEL_reelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USERREEL" DROP CONSTRAINT "Comment_USERREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USERSHARE" DROP CONSTRAINT "Comment_USERSHARE_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USERSHARE" DROP CONSTRAINT "Comment_USERSHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USERSHARE_TOGROUP" DROP CONSTRAINT "Comment_USERSHARE_TOGROUP_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USERSHARE_TOGROUP" DROP CONSTRAINT "Comment_USERSHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USER_MEDIA" DROP CONSTRAINT "Comment_USER_MEDIA_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment_USER_MEDIA" DROP CONSTRAINT "Comment_USER_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Firends" DROP CONSTRAINT "Firends_recieverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Firends" DROP CONSTRAINT "Firends_senderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GroupRules" DROP CONSTRAINT "GroupRules_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Medias_GROUP" DROP CONSTRAINT "Medias_GROUP_groupPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Medias_PAGE" DROP CONSTRAINT "Medias_PAGE_pagePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Medias_USER" DROP CONSTRAINT "Medias_USER_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MessageMedias_PAGE" DROP CONSTRAINT "MessageMedias_PAGE_messageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MessageMedias_USER" DROP CONSTRAINT "MessageMedias_USER_messageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReaction_PAGEREEL" DROP CONSTRAINT "PostReaction_PAGEREEL_reelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReaction_PAGEREEL" DROP CONSTRAINT "PostReaction_PAGEREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_GROUP" DROP CONSTRAINT "PostReactions_GROUP_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_GROUP" DROP CONSTRAINT "PostReactions_GROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_GROUP_MEDIA" DROP CONSTRAINT "PostReactions_GROUP_MEDIA_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_GROUP_MEDIA" DROP CONSTRAINT "PostReactions_GROUP_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_PAGE" DROP CONSTRAINT "PostReactions_PAGE_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_PAGE" DROP CONSTRAINT "PostReactions_PAGE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_PAGESHARE" DROP CONSTRAINT "PostReactions_PAGESHARE_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_PAGESHARE" DROP CONSTRAINT "PostReactions_PAGESHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_PAGESHARE_TOGROUP" DROP CONSTRAINT "PostReactions_PAGESHARE_TOGROUP_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_PAGESHARE_TOGROUP" DROP CONSTRAINT "PostReactions_PAGESHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_PAGE_MEDIA" DROP CONSTRAINT "PostReactions_PAGE_MEDIA_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_PAGE_MEDIA" DROP CONSTRAINT "PostReactions_PAGE_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USER" DROP CONSTRAINT "PostReactions_USER_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USER" DROP CONSTRAINT "PostReactions_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USERREEL" DROP CONSTRAINT "PostReactions_USERREEL_reelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USERREEL" DROP CONSTRAINT "PostReactions_USERREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USERSHARE" DROP CONSTRAINT "PostReactions_USERSHARE_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USERSHARE" DROP CONSTRAINT "PostReactions_USERSHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USERSHARE_TOGROUP" DROP CONSTRAINT "PostReactions_USERSHARE_TOGROUP_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USERSHARE_TOGROUP" DROP CONSTRAINT "PostReactions_USERSHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USER_MEDIA" DROP CONSTRAINT "PostReactions_USER_MEDIA_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostReactions_USER_MEDIA" DROP CONSTRAINT "PostReactions_USER_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_GROUP" DROP CONSTRAINT "Post_GROUP_groupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_GROUP" DROP CONSTRAINT "Post_GROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGE" DROP CONSTRAINT "Post_PAGE_pageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE" DROP CONSTRAINT "Post_PAGESHARE_groupMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE" DROP CONSTRAINT "Post_PAGESHARE_groupPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE" DROP CONSTRAINT "Post_PAGESHARE_pageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE" DROP CONSTRAINT "Post_PAGESHARE_pageMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE" DROP CONSTRAINT "Post_PAGESHARE_pagePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE" DROP CONSTRAINT "Post_PAGESHARE_userMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE" DROP CONSTRAINT "Post_PAGESHARE_userPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE_TOGROUP" DROP CONSTRAINT "Post_PAGESHARE_TOGROUP_groupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE_TOGROUP" DROP CONSTRAINT "Post_PAGESHARE_TOGROUP_groupMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE_TOGROUP" DROP CONSTRAINT "Post_PAGESHARE_TOGROUP_groupPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE_TOGROUP" DROP CONSTRAINT "Post_PAGESHARE_TOGROUP_pageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE_TOGROUP" DROP CONSTRAINT "Post_PAGESHARE_TOGROUP_pageMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE_TOGROUP" DROP CONSTRAINT "Post_PAGESHARE_TOGROUP_pagePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE_TOGROUP" DROP CONSTRAINT "Post_PAGESHARE_TOGROUP_userMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_PAGESHARE_TOGROUP" DROP CONSTRAINT "Post_PAGESHARE_TOGROUP_userPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USER" DROP CONSTRAINT "Post_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE" DROP CONSTRAINT "Post_USERSHARE_groupMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE" DROP CONSTRAINT "Post_USERSHARE_groupPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE" DROP CONSTRAINT "Post_USERSHARE_pageMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE" DROP CONSTRAINT "Post_USERSHARE_pagePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE" DROP CONSTRAINT "Post_USERSHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE" DROP CONSTRAINT "Post_USERSHARE_userMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE" DROP CONSTRAINT "Post_USERSHARE_userPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE_TOGROUP" DROP CONSTRAINT "Post_USERSHARE_TOGROUP_groupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE_TOGROUP" DROP CONSTRAINT "Post_USERSHARE_TOGROUP_groupMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE_TOGROUP" DROP CONSTRAINT "Post_USERSHARE_TOGROUP_groupPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE_TOGROUP" DROP CONSTRAINT "Post_USERSHARE_TOGROUP_pageMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE_TOGROUP" DROP CONSTRAINT "Post_USERSHARE_TOGROUP_pagePostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE_TOGROUP" DROP CONSTRAINT "Post_USERSHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE_TOGROUP" DROP CONSTRAINT "Post_USERSHARE_TOGROUP_userMediaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post_USERSHARE_TOGROUP" DROP CONSTRAINT "Post_USERSHARE_TOGROUP_userPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PreviousCity" DROP CONSTRAINT "PreviousCity_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile_USER" DROP CONSTRAINT "Profile_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reel_PAGE" DROP CONSTRAINT "Reel_PAGE_pageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reel_USER" DROP CONSTRAINT "Reel_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_GROUP" DROP CONSTRAINT "ReplyReactions_GROUP_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_GROUP" DROP CONSTRAINT "ReplyReactions_GROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_GROUP_MEDIA" DROP CONSTRAINT "ReplyReactions_GROUP_MEDIA_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_GROUP_MEDIA" DROP CONSTRAINT "ReplyReactions_GROUP_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGE" DROP CONSTRAINT "ReplyReactions_PAGE_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGE" DROP CONSTRAINT "ReplyReactions_PAGE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGEREEL" DROP CONSTRAINT "ReplyReactions_PAGEREEL_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGEREEL" DROP CONSTRAINT "ReplyReactions_PAGEREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGESHARE" DROP CONSTRAINT "ReplyReactions_PAGESHARE_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGESHARE" DROP CONSTRAINT "ReplyReactions_PAGESHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGESHARE_TOGROUP" DROP CONSTRAINT "ReplyReactions_PAGESHARE_TOGROUP_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGESHARE_TOGROUP" DROP CONSTRAINT "ReplyReactions_PAGESHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGE_MEDIA" DROP CONSTRAINT "ReplyReactions_PAGE_MEDIA_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_PAGE_MEDIA" DROP CONSTRAINT "ReplyReactions_PAGE_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USER" DROP CONSTRAINT "ReplyReactions_USER_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USER" DROP CONSTRAINT "ReplyReactions_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USERREEL" DROP CONSTRAINT "ReplyReactions_USERREEL_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USERREEL" DROP CONSTRAINT "ReplyReactions_USERREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USERSHARE" DROP CONSTRAINT "ReplyReactions_USERSHARE_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USERSHARE" DROP CONSTRAINT "ReplyReactions_USERSHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USERSHARE_TOGROUP" DROP CONSTRAINT "ReplyReactions_USERSHARE_TOGROUP_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USERSHARE_TOGROUP" DROP CONSTRAINT "ReplyReactions_USERSHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USER_MEDIA" DROP CONSTRAINT "ReplyReactions_USER_MEDIA_replyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReplyReactions_USER_MEDIA" DROP CONSTRAINT "ReplyReactions_USER_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_GROUP" DROP CONSTRAINT "Reply_GROUP_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_GROUP" DROP CONSTRAINT "Reply_GROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_GROUP_MEDIA" DROP CONSTRAINT "Reply_GROUP_MEDIA_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_GROUP_MEDIA" DROP CONSTRAINT "Reply_GROUP_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGE" DROP CONSTRAINT "Reply_PAGE_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGE" DROP CONSTRAINT "Reply_PAGE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGEREEL" DROP CONSTRAINT "Reply_PAGEREEL_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGEREEL" DROP CONSTRAINT "Reply_PAGEREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGESHARE" DROP CONSTRAINT "Reply_PAGESHARE_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGESHARE" DROP CONSTRAINT "Reply_PAGESHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGESHARE_TOGROUP" DROP CONSTRAINT "Reply_PAGESHARE_TOGROUP_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGESHARE_TOGROUP" DROP CONSTRAINT "Reply_PAGESHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGE_MEDIA" DROP CONSTRAINT "Reply_PAGE_MEDIA_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_PAGE_MEDIA" DROP CONSTRAINT "Reply_PAGE_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USER" DROP CONSTRAINT "Reply_USER_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USER" DROP CONSTRAINT "Reply_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USERREEL" DROP CONSTRAINT "Reply_USERREEL_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USERREEL" DROP CONSTRAINT "Reply_USERREEL_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USERSHARE" DROP CONSTRAINT "Reply_USERSHARE_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USERSHARE" DROP CONSTRAINT "Reply_USERSHARE_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USERSHARE_TOGROUP" DROP CONSTRAINT "Reply_USERSHARE_TOGROUP_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USERSHARE_TOGROUP" DROP CONSTRAINT "Reply_USERSHARE_TOGROUP_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USER_MEDIA" DROP CONSTRAINT "Reply_USER_MEDIA_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply_USER_MEDIA" DROP CONSTRAINT "Reply_USER_MEDIA_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Schools_USER" DROP CONSTRAINT "Schools_USER_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SocialLinks_GROUP" DROP CONSTRAINT "SocialLinks_GROUP_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SocialLinks_PAGE" DROP CONSTRAINT "SocialLinks_PAGE_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SocialLinks_USER" DROP CONSTRAINT "SocialLinks_USER_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StoryMedia_PAGE" DROP CONSTRAINT "StoryMedia_PAGE_pageStoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StoryMedia_USER" DROP CONSTRAINT "StoryMedia_USER_storyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Story_PAGE" DROP CONSTRAINT "Story_PAGE_pageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Story_USER" DROP CONSTRAINT "Story_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tags_USER" DROP CONSTRAINT "Tags_USER_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tags_USER" DROP CONSTRAINT "Tags_USER_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Websites_GROUP" DROP CONSTRAINT "Websites_GROUP_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Websites_PAGE" DROP CONSTRAINT "Websites_PAGE_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Websites_USER" DROP CONSTRAINT "Websites_USER_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Works_USER" DROP CONSTRAINT "Works_USER_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PageToUser" DROP CONSTRAINT "_PageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PageToUser" DROP CONSTRAINT "_PageToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Post_USERToUser" DROP CONSTRAINT "_Post_USERToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Post_USERToUser" DROP CONSTRAINT "_Post_USERToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_admins" DROP CONSTRAINT "_admins_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_admins" DROP CONSTRAINT "_admins_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_moderators" DROP CONSTRAINT "_moderators_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_moderators" DROP CONSTRAINT "_moderators_B_fkey";

-- AlterTable
ALTER TABLE "Firends" DROP COLUMN "recieverId",
DROP COLUMN "senderId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "groupMembersId",
ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GroupRules" DROP COLUMN "profileId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MessageMedias_PAGE" DROP COLUMN "height",
DROP COLUMN "postId",
DROP COLUMN "size",
DROP COLUMN "width",
DROP COLUMN "type",
ADD COLUMN     "type" "MessageMediaType" NOT NULL;

-- AlterTable
ALTER TABLE "MessageMedias_USER" DROP COLUMN "height",
DROP COLUMN "postId",
DROP COLUMN "size",
DROP COLUMN "width",
DROP COLUMN "type",
ADD COLUMN     "type" "MessageMediaType" NOT NULL;

-- DropTable
DROP TABLE "public"."CommentReaction_PAGEREEL";

-- DropTable
DROP TABLE "public"."CommentReaction_PAGESHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."CommentReaction_USERREEL";

-- DropTable
DROP TABLE "public"."CommentReaction_USERSHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."CommentReactions_GROUP";

-- DropTable
DROP TABLE "public"."CommentReactions_GROUP_MEDIA";

-- DropTable
DROP TABLE "public"."CommentReactions_PAGE";

-- DropTable
DROP TABLE "public"."CommentReactions_PAGESHARE";

-- DropTable
DROP TABLE "public"."CommentReactions_PAGE_MEDIA";

-- DropTable
DROP TABLE "public"."CommentReactions_USER";

-- DropTable
DROP TABLE "public"."CommentReactions_USERSHARE";

-- DropTable
DROP TABLE "public"."CommentReactions_USER_MEDIA";

-- DropTable
DROP TABLE "public"."Comment_GROUP";

-- DropTable
DROP TABLE "public"."Comment_GROUP_MEDIA";

-- DropTable
DROP TABLE "public"."Comment_PAGE";

-- DropTable
DROP TABLE "public"."Comment_PAGEREEL";

-- DropTable
DROP TABLE "public"."Comment_PAGESHARE";

-- DropTable
DROP TABLE "public"."Comment_PAGESHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."Comment_PAGE_MEDIA";

-- DropTable
DROP TABLE "public"."Comment_USER";

-- DropTable
DROP TABLE "public"."Comment_USERREEL";

-- DropTable
DROP TABLE "public"."Comment_USERSHARE";

-- DropTable
DROP TABLE "public"."Comment_USERSHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."Comment_USER_MEDIA";

-- DropTable
DROP TABLE "public"."Medias_GROUP";

-- DropTable
DROP TABLE "public"."Medias_PAGE";

-- DropTable
DROP TABLE "public"."Medias_USER";

-- DropTable
DROP TABLE "public"."PostReaction_PAGEREEL";

-- DropTable
DROP TABLE "public"."PostReactions_GROUP";

-- DropTable
DROP TABLE "public"."PostReactions_GROUP_MEDIA";

-- DropTable
DROP TABLE "public"."PostReactions_PAGE";

-- DropTable
DROP TABLE "public"."PostReactions_PAGESHARE";

-- DropTable
DROP TABLE "public"."PostReactions_PAGESHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."PostReactions_PAGE_MEDIA";

-- DropTable
DROP TABLE "public"."PostReactions_USER";

-- DropTable
DROP TABLE "public"."PostReactions_USERREEL";

-- DropTable
DROP TABLE "public"."PostReactions_USERSHARE";

-- DropTable
DROP TABLE "public"."PostReactions_USERSHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."PostReactions_USER_MEDIA";

-- DropTable
DROP TABLE "public"."Post_GROUP";

-- DropTable
DROP TABLE "public"."Post_PAGE";

-- DropTable
DROP TABLE "public"."Post_PAGESHARE";

-- DropTable
DROP TABLE "public"."Post_PAGESHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."Post_USER";

-- DropTable
DROP TABLE "public"."Post_USERSHARE";

-- DropTable
DROP TABLE "public"."Post_USERSHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."Profile_GROUP";

-- DropTable
DROP TABLE "public"."Profile_PAGE";

-- DropTable
DROP TABLE "public"."Profile_USER";

-- DropTable
DROP TABLE "public"."Reel_PAGE";

-- DropTable
DROP TABLE "public"."Reel_USER";

-- DropTable
DROP TABLE "public"."ReplyReactions_GROUP";

-- DropTable
DROP TABLE "public"."ReplyReactions_GROUP_MEDIA";

-- DropTable
DROP TABLE "public"."ReplyReactions_PAGE";

-- DropTable
DROP TABLE "public"."ReplyReactions_PAGEREEL";

-- DropTable
DROP TABLE "public"."ReplyReactions_PAGESHARE";

-- DropTable
DROP TABLE "public"."ReplyReactions_PAGESHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."ReplyReactions_PAGE_MEDIA";

-- DropTable
DROP TABLE "public"."ReplyReactions_USER";

-- DropTable
DROP TABLE "public"."ReplyReactions_USERREEL";

-- DropTable
DROP TABLE "public"."ReplyReactions_USERSHARE";

-- DropTable
DROP TABLE "public"."ReplyReactions_USERSHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."ReplyReactions_USER_MEDIA";

-- DropTable
DROP TABLE "public"."Reply_GROUP";

-- DropTable
DROP TABLE "public"."Reply_GROUP_MEDIA";

-- DropTable
DROP TABLE "public"."Reply_PAGE";

-- DropTable
DROP TABLE "public"."Reply_PAGEREEL";

-- DropTable
DROP TABLE "public"."Reply_PAGESHARE";

-- DropTable
DROP TABLE "public"."Reply_PAGESHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."Reply_PAGE_MEDIA";

-- DropTable
DROP TABLE "public"."Reply_USER";

-- DropTable
DROP TABLE "public"."Reply_USERREEL";

-- DropTable
DROP TABLE "public"."Reply_USERSHARE";

-- DropTable
DROP TABLE "public"."Reply_USERSHARE_TOGROUP";

-- DropTable
DROP TABLE "public"."Reply_USER_MEDIA";

-- DropTable
DROP TABLE "public"."SocialLinks_GROUP";

-- DropTable
DROP TABLE "public"."SocialLinks_PAGE";

-- DropTable
DROP TABLE "public"."StoryMedia_PAGE";

-- DropTable
DROP TABLE "public"."StoryMedia_USER";

-- DropTable
DROP TABLE "public"."Story_PAGE";

-- DropTable
DROP TABLE "public"."Story_USER";

-- DropTable
DROP TABLE "public"."Tags_USER";

-- DropTable
DROP TABLE "public"."Websites_GROUP";

-- DropTable
DROP TABLE "public"."Websites_PAGE";

-- DropTable
DROP TABLE "public"."_PageToUser";

-- DropTable
DROP TABLE "public"."_Post_USERToUser";

-- DropTable
DROP TABLE "public"."_admins";

-- DropTable
DROP TABLE "public"."_moderators";

-- CreateTable
CREATE TABLE "UserPost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT,
    "location" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFollow" (
    "id" TEXT NOT NULL,
    "followerUserId" TEXT NOT NULL,
    "followingUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFollow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSharePost" (
    "id" TEXT NOT NULL,
    "shareWhat" "ShareType" NOT NULL,
    "content" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "userId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "mediaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSharePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "userPostId" TEXT,
    "userSharePostId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "homeTown" TEXT,
    "currentCity" TEXT,
    "bio" TEXT,
    "relationShipStatus" TEXT,
    "nickName" TEXT,
    "aboutYou" TEXT,
    "favoriteQuotes" TEXT,
    "profilePicture" TEXT,
    "coverPhoto" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupPost" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'grouppost',
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToGroupSharePost" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'pagesharetogrouppost',
    "shareType" "ShareType" NOT NULL,
    "userId" TEXT,
    "pageId" TEXT,
    "sharingWhat" "PostType" NOT NULL DEFAULT 'pagesharepost',
    "content" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "location" TEXT,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "mediaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToGroupSharePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupAdmin" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupModerator" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupModerator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PagePost" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'pagepost',
    "pageId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PagePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSharePost" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "sharingWhat" "PostType" NOT NULL DEFAULT 'pagesharepost',
    "content" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "location" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "mediaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSharePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPageFollow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paegId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPageFollow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageFollow" (
    "id" TEXT NOT NULL,
    "pageId1" TEXT,
    "pageId2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageFollow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT,
    "feedId" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "pageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryMedia" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoryMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "userSharePostId" TEXT,
    "pageSharePostId" TEXT,
    "toGroupSharePostId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedComment" (
    "id" TEXT NOT NULL,
    "feedId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedReaction" (
    "id" TEXT NOT NULL,
    "feedId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedReply" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedCommentReaction" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedCommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedReplyReactions" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedReplyReactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedReplyReply" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedReplyReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedReplyReplyReactions" (
    "id" TEXT NOT NULL,
    "replyReplyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedReplyReplyReactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaComment" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaReaction" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaReply" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaCommentReaction" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaCommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaReplyReactions" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaReplyReactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaReplyReply" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaReplyReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaReplyReplyReactions" (
    "id" TEXT NOT NULL,
    "replyReplyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaReplyReplyReactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reel" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "pageId" TEXT,
    "url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupAdmin_userId_key" ON "GroupAdmin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PageFollow_pageId1_pageId2_key" ON "PageFollow"("pageId1", "pageId2");

-- CreateIndex
CREATE UNIQUE INDEX "Group_userId_key" ON "Group"("userId");

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followingUserId_fkey" FOREIGN KEY ("followingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "UserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "PagePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "UserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_userSharePostId_fkey" FOREIGN KEY ("userSharePostId") REFERENCES "UserSharePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Firends" ADD CONSTRAINT "Firends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousCity" ADD CONSTRAINT "PreviousCity_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks_USER" ADD CONSTRAINT "SocialLinks_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collges_USER" ADD CONSTRAINT "Collges_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Websites_USER" ADD CONSTRAINT "Websites_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schools_USER" ADD CONSTRAINT "Schools_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works_USER" ADD CONSTRAINT "Works_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPost" ADD CONSTRAINT "GroupPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPost" ADD CONSTRAINT "GroupPost_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "UserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "PagePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRules" ADD CONSTRAINT "GroupRules_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupAdmin" ADD CONSTRAINT "GroupAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupAdmin" ADD CONSTRAINT "GroupAdmin_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupModerator" ADD CONSTRAINT "GroupModerator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupModerator" ADD CONSTRAINT "GroupModerator_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePost" ADD CONSTRAINT "PagePost_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "UserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "PagePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPageFollow" ADD CONSTRAINT "UserPageFollow_paegId_fkey" FOREIGN KEY ("paegId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPageFollow" ADD CONSTRAINT "UserPageFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageFollow" ADD CONSTRAINT "PageFollow_pageId1_fkey" FOREIGN KEY ("pageId1") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageFollow" ADD CONSTRAINT "PageFollow_pageId2_fkey" FOREIGN KEY ("pageId2") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "UserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "PagePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMedias_USER" ADD CONSTRAINT "MessageMedias_USER_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMedias_PAGE" ADD CONSTRAINT "MessageMedias_PAGE_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message_PAGE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryMedia" ADD CONSTRAINT "StoryMedia_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "UserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "PagePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_userSharePostId_fkey" FOREIGN KEY ("userSharePostId") REFERENCES "UserSharePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_pageSharePostId_fkey" FOREIGN KEY ("pageSharePostId") REFERENCES "PageSharePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_toGroupSharePostId_fkey" FOREIGN KEY ("toGroupSharePostId") REFERENCES "ToGroupSharePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedComment" ADD CONSTRAINT "FeedComment_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedComment" ADD CONSTRAINT "FeedComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReaction" ADD CONSTRAINT "FeedReaction_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReaction" ADD CONSTRAINT "FeedReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReply" ADD CONSTRAINT "FeedReply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "FeedComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReply" ADD CONSTRAINT "FeedReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedCommentReaction" ADD CONSTRAINT "FeedCommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "FeedComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedCommentReaction" ADD CONSTRAINT "FeedCommentReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReplyReactions" ADD CONSTRAINT "FeedReplyReactions_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "FeedReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReplyReactions" ADD CONSTRAINT "FeedReplyReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReplyReply" ADD CONSTRAINT "FeedReplyReply_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "FeedReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReplyReply" ADD CONSTRAINT "FeedReplyReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReplyReplyReactions" ADD CONSTRAINT "FeedReplyReplyReactions_replyReplyId_fkey" FOREIGN KEY ("replyReplyId") REFERENCES "FeedReplyReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedReplyReplyReactions" ADD CONSTRAINT "FeedReplyReplyReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaComment" ADD CONSTRAINT "MediaComment_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaComment" ADD CONSTRAINT "MediaComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReaction" ADD CONSTRAINT "MediaReaction_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReaction" ADD CONSTRAINT "MediaReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReply" ADD CONSTRAINT "MediaReply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "MediaComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReply" ADD CONSTRAINT "MediaReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCommentReaction" ADD CONSTRAINT "MediaCommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "MediaComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCommentReaction" ADD CONSTRAINT "MediaCommentReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReplyReactions" ADD CONSTRAINT "MediaReplyReactions_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "MediaReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReplyReactions" ADD CONSTRAINT "MediaReplyReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReplyReply" ADD CONSTRAINT "MediaReplyReply_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "MediaReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReplyReply" ADD CONSTRAINT "MediaReplyReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReplyReplyReactions" ADD CONSTRAINT "MediaReplyReplyReactions_replyReplyId_fkey" FOREIGN KEY ("replyReplyId") REFERENCES "MediaReplyReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaReplyReplyReactions" ADD CONSTRAINT "MediaReplyReplyReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reel" ADD CONSTRAINT "Reel_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reel" ADD CONSTRAINT "Reel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
