-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'custom');

-- CreateEnum
CREATE TYPE "Audinece" AS ENUM ('public', 'friends', 'custom');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video');

-- CreateEnum
CREATE TYPE "SuperAudinece" AS ENUM ('friendsExcept', 'specificFriends', 'customList');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('userpost', 'grouppost', 'pagepost', 'usersharepost', 'pagesharepost', 'usersharetogrouppost', 'pagesharetogrouppost');

-- CreateEnum
CREATE TYPE "ShareType" AS ENUM ('userpost', 'grouppost', 'pagepost', 'userpostmedia', 'grouppostmedia', 'pagepostmedia');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('like', 'love', 'sad', 'angry', 'care', 'haha', 'wow');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "customGender" TEXT,
    "customGenderPronoun" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,
    "verificationCode" INTEGER,
    "verificationExpiredAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "activeAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Firends" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recieverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Firends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL,
    "sendId" TEXT NOT NULL,
    "recieverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medias_USER" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medias_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageMedias_USER" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageMedias_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageMedias_PAGE" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageMedias_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medias_PAGE" (
    "id" TEXT NOT NULL,
    "pagePostId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medias_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medias_GROUP" (
    "id" TEXT NOT NULL,
    "groupPostId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medias_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags_USER" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tags_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_USER" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'userpost',
    "userId" TEXT NOT NULL,
    "content" TEXT,
    "location" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "sAudience" "SuperAudinece",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_PAGE" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'pagepost',
    "pageId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "audience" "Audinece" NOT NULL DEFAULT 'public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_GROUP" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'grouppost',
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "sAudience" "SuperAudinece",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "groupMembersId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMembers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_USERSHARE" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'usersharepost',
    "shareType" "ShareType" NOT NULL,
    "content" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "cAudience" "SuperAudinece",
    "userId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "userMediaId" TEXT,
    "pageMediaId" TEXT,
    "groupMediaId" TEXT,
    "sharingType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_USERSHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_PAGESHARE" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'pagesharepost',
    "shareType" "ShareType" NOT NULL,
    "content" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "cAudience" "SuperAudinece",
    "pageId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "userMediaId" TEXT,
    "pageMediaId" TEXT,
    "groupMediaId" TEXT,
    "sharingType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_PAGESHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_PAGESHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'pagesharetogrouppost',
    "shareType" "ShareType" NOT NULL,
    "content" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "cAudience" "SuperAudinece",
    "pageId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "userMediaId" TEXT,
    "pageMediaId" TEXT,
    "groupMediaId" TEXT,
    "sharingType" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_PAGESHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_USERSHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'usersharetogrouppost',
    "shareType" "ShareType" NOT NULL,
    "content" TEXT NOT NULL,
    "doing" TEXT NOT NULL,
    "doingWhat" TEXT NOT NULL,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "cAudience" "SuperAudinece",
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "userMediaId" TEXT,
    "pageMediaId" TEXT,
    "groupMediaId" TEXT,
    "sharingType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_USERSHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message_USER" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recieverId" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message_PAGE" (
    "id" TEXT NOT NULL,
    "senderId" TEXT,
    "recieverId" TEXT,
    "senderId_page" TEXT,
    "recieverId_page" TEXT,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryMedia_USER" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoryMedia_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story_USER" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryMedia_PAGE" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pageStoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoryMedia_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story_PAGE" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_USER" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_PAGE" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_GROUP" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_USERSHARE" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_USERSHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_PAGESHARE" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_PAGESHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_USERSHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_USERSHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_PAGESHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_PAGESHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_USER" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_PAGE" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_GROUP" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_USERSHARE" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_USERSHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_PAGESHARE" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_PAGESHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_USERSHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_USERSHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_PAGESHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_PAGESHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReactions_USER" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReactions_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReactions_PAGE" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReactions_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReactions_GROUP" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReactions_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReactions_USERSHARE" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReactions_USERSHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReactions_PAGESHARE" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReactions_PAGESHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReaction_USERSHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReaction_USERSHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReaction_PAGESHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReaction_PAGESHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_USER" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_PAGE" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_GROUP" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_USERSHARE" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_USERSHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_PAGESHARE" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_PAGESHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_USERSHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_USERSHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_PAGESHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_PAGESHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_USER" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_PAGE" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_GROUP" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_USERSHARE" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_USERSHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_PAGESHARE" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_PAGESHARE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_USERSHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_USERSHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_PAGESHARE_TOGROUP" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_PAGESHARE_TOGROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile_PAGE" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "profilePicture" TEXT,
    "coverPhoto" TEXT,
    "avatar" TEXT,
    "about" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile_GROUP" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "profilePicture" TEXT,
    "coverPhoto" TEXT,
    "avatar" TEXT,
    "about" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLinks_GROUP" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "SocialLinks_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Websites_GROUP" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Websites_GROUP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupRules" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLinks_PAGE" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "SocialLinks_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Websites_PAGE" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Websites_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile_USER" (
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

    CONSTRAINT "Profile_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousCity" (
    "id" TEXT NOT NULL,
    "dateYear" TEXT NOT NULL,
    "dateMonth" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PreviousCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLinks_USER" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "SocialLinks_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collges_USER" (
    "id" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "attendedFor" TEXT NOT NULL,
    "graduated" BOOLEAN NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collges_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concentraions" (
    "id" TEXT NOT NULL,
    "concentration" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collgeProfileId" TEXT NOT NULL,

    CONSTRAINT "Concentraions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Websites_USER" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Websites_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schools_USER" (
    "id" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "graduated" BOOLEAN NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schools_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Works_USER" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "currentlyWorking" BOOLEAN,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Works_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reel_USER" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reel_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_USERREEL" (
    "id" TEXT NOT NULL,
    "reelId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_USERREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_USERREEL" (
    "id" TEXT NOT NULL,
    "reelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_USERREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReaction_USERREEL" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReaction_USERREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_USERREEL" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_USERREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_USERREEL" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_USERREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reel_PAGE" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reel_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReaction_PAGEREEL" (
    "id" TEXT NOT NULL,
    "reelId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReaction_PAGEREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_PAGEREEL" (
    "id" TEXT NOT NULL,
    "reelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_PAGEREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReaction_PAGEREEL" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReaction_PAGEREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_PAGEREEL" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_PAGEREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_PAGEREEL" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_PAGEREEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_USER_MEDIA" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_USER_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_USER_MEDIA" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_USER_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_USER_MEDIA" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_USER_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReactions_USER_MEDIA" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReactions_USER_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_USER_MEDIA" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_USER_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_PAGE_MEDIA" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_PAGE_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_PAGE_MEDIA" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_PAGE_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_PAGE_MEDIA" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_PAGE_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReactions_PAGE_MEDIA" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReactions_PAGE_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_PAGE_MEDIA" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_PAGE_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_GROUP_MEDIA" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_GROUP_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply_GROUP_MEDIA" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_GROUP_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReactions_GROUP_MEDIA" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReactions_GROUP_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReactions_GROUP_MEDIA" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReactions_GROUP_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReactions_GROUP_MEDIA" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReactions_GROUP_MEDIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PageToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PageToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Post_USERToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Post_USERToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_admins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_admins_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_moderators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_moderators_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_PAGE_pageId_key" ON "Profile_PAGE"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_GROUP_pageId_key" ON "Profile_GROUP"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_USER_userId_key" ON "Profile_USER"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PreviousCity_profileId_key" ON "PreviousCity"("profileId");

-- CreateIndex
CREATE INDEX "_PageToUser_B_index" ON "_PageToUser"("B");

-- CreateIndex
CREATE INDEX "_Post_USERToUser_B_index" ON "_Post_USERToUser"("B");

-- CreateIndex
CREATE INDEX "_admins_B_index" ON "_admins"("B");

-- CreateIndex
CREATE INDEX "_moderators_B_index" ON "_moderators"("B");

-- AddForeignKey
ALTER TABLE "Firends" ADD CONSTRAINT "Firends_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Firends" ADD CONSTRAINT "Firends_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_sendId_fkey" FOREIGN KEY ("sendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medias_USER" ADD CONSTRAINT "Medias_USER_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMedias_USER" ADD CONSTRAINT "MessageMedias_USER_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMedias_PAGE" ADD CONSTRAINT "MessageMedias_PAGE_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medias_PAGE" ADD CONSTRAINT "Medias_PAGE_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "Post_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medias_GROUP" ADD CONSTRAINT "Medias_GROUP_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "Post_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags_USER" ADD CONSTRAINT "Tags_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags_USER" ADD CONSTRAINT "Tags_USER_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USER" ADD CONSTRAINT "Post_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGE" ADD CONSTRAINT "Post_PAGE_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_GROUP" ADD CONSTRAINT "Post_GROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_GROUP" ADD CONSTRAINT "Post_GROUP_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembers" ADD CONSTRAINT "GroupMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembers" ADD CONSTRAINT "GroupMembers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE" ADD CONSTRAINT "Post_USERSHARE_userMediaId_fkey" FOREIGN KEY ("userMediaId") REFERENCES "Medias_USER"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE" ADD CONSTRAINT "Post_USERSHARE_pageMediaId_fkey" FOREIGN KEY ("pageMediaId") REFERENCES "Medias_PAGE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE" ADD CONSTRAINT "Post_USERSHARE_groupMediaId_fkey" FOREIGN KEY ("groupMediaId") REFERENCES "Medias_GROUP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE" ADD CONSTRAINT "Post_USERSHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE" ADD CONSTRAINT "Post_USERSHARE_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "Post_USER"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE" ADD CONSTRAINT "Post_USERSHARE_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "Post_PAGE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE" ADD CONSTRAINT "Post_USERSHARE_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "Post_GROUP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE" ADD CONSTRAINT "Post_PAGESHARE_userMediaId_fkey" FOREIGN KEY ("userMediaId") REFERENCES "Medias_USER"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE" ADD CONSTRAINT "Post_PAGESHARE_pageMediaId_fkey" FOREIGN KEY ("pageMediaId") REFERENCES "Medias_PAGE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE" ADD CONSTRAINT "Post_PAGESHARE_groupMediaId_fkey" FOREIGN KEY ("groupMediaId") REFERENCES "Medias_GROUP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE" ADD CONSTRAINT "Post_PAGESHARE_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE" ADD CONSTRAINT "Post_PAGESHARE_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "Post_USER"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE" ADD CONSTRAINT "Post_PAGESHARE_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "Post_PAGE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE" ADD CONSTRAINT "Post_PAGESHARE_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "Post_GROUP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE_TOGROUP" ADD CONSTRAINT "Post_PAGESHARE_TOGROUP_userMediaId_fkey" FOREIGN KEY ("userMediaId") REFERENCES "Medias_USER"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE_TOGROUP" ADD CONSTRAINT "Post_PAGESHARE_TOGROUP_pageMediaId_fkey" FOREIGN KEY ("pageMediaId") REFERENCES "Medias_PAGE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE_TOGROUP" ADD CONSTRAINT "Post_PAGESHARE_TOGROUP_groupMediaId_fkey" FOREIGN KEY ("groupMediaId") REFERENCES "Medias_GROUP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE_TOGROUP" ADD CONSTRAINT "Post_PAGESHARE_TOGROUP_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE_TOGROUP" ADD CONSTRAINT "Post_PAGESHARE_TOGROUP_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE_TOGROUP" ADD CONSTRAINT "Post_PAGESHARE_TOGROUP_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "Post_USER"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE_TOGROUP" ADD CONSTRAINT "Post_PAGESHARE_TOGROUP_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "Post_PAGE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_PAGESHARE_TOGROUP" ADD CONSTRAINT "Post_PAGESHARE_TOGROUP_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "Post_GROUP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE_TOGROUP" ADD CONSTRAINT "Post_USERSHARE_TOGROUP_userMediaId_fkey" FOREIGN KEY ("userMediaId") REFERENCES "Medias_USER"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE_TOGROUP" ADD CONSTRAINT "Post_USERSHARE_TOGROUP_pageMediaId_fkey" FOREIGN KEY ("pageMediaId") REFERENCES "Medias_PAGE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE_TOGROUP" ADD CONSTRAINT "Post_USERSHARE_TOGROUP_groupMediaId_fkey" FOREIGN KEY ("groupMediaId") REFERENCES "Medias_GROUP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE_TOGROUP" ADD CONSTRAINT "Post_USERSHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE_TOGROUP" ADD CONSTRAINT "Post_USERSHARE_TOGROUP_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE_TOGROUP" ADD CONSTRAINT "Post_USERSHARE_TOGROUP_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "Post_USER"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE_TOGROUP" ADD CONSTRAINT "Post_USERSHARE_TOGROUP_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "Post_PAGE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_USERSHARE_TOGROUP" ADD CONSTRAINT "Post_USERSHARE_TOGROUP_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "Post_GROUP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_USER" ADD CONSTRAINT "Message_USER_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_USER" ADD CONSTRAINT "Message_USER_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_PAGE" ADD CONSTRAINT "Message_PAGE_senderId_page_fkey" FOREIGN KEY ("senderId_page") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_PAGE" ADD CONSTRAINT "Message_PAGE_recieverId_page_fkey" FOREIGN KEY ("recieverId_page") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_PAGE" ADD CONSTRAINT "Message_PAGE_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_PAGE" ADD CONSTRAINT "Message_PAGE_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryMedia_USER" ADD CONSTRAINT "StoryMedia_USER_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story_USER" ADD CONSTRAINT "Story_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryMedia_PAGE" ADD CONSTRAINT "StoryMedia_PAGE_pageStoryId_fkey" FOREIGN KEY ("pageStoryId") REFERENCES "Story_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story_PAGE" ADD CONSTRAINT "Story_PAGE_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USER" ADD CONSTRAINT "Reply_USER_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USER" ADD CONSTRAINT "Reply_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGE" ADD CONSTRAINT "Reply_PAGE_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGE" ADD CONSTRAINT "Reply_PAGE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_GROUP" ADD CONSTRAINT "Reply_GROUP_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_GROUP" ADD CONSTRAINT "Reply_GROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USERSHARE" ADD CONSTRAINT "Reply_USERSHARE_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USERSHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USERSHARE" ADD CONSTRAINT "Reply_USERSHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGESHARE" ADD CONSTRAINT "Reply_PAGESHARE_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGESHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGESHARE" ADD CONSTRAINT "Reply_PAGESHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USERSHARE_TOGROUP" ADD CONSTRAINT "Reply_USERSHARE_TOGROUP_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USERSHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USERSHARE_TOGROUP" ADD CONSTRAINT "Reply_USERSHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGESHARE_TOGROUP" ADD CONSTRAINT "Reply_PAGESHARE_TOGROUP_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGESHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGESHARE_TOGROUP" ADD CONSTRAINT "Reply_PAGESHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USER" ADD CONSTRAINT "Comment_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USER" ADD CONSTRAINT "Comment_USER_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGE" ADD CONSTRAINT "Comment_PAGE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGE" ADD CONSTRAINT "Comment_PAGE_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_GROUP" ADD CONSTRAINT "Comment_GROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_GROUP" ADD CONSTRAINT "Comment_GROUP_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USERSHARE" ADD CONSTRAINT "Comment_USERSHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USERSHARE" ADD CONSTRAINT "Comment_USERSHARE_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_USERSHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGESHARE" ADD CONSTRAINT "Comment_PAGESHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGESHARE" ADD CONSTRAINT "Comment_PAGESHARE_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_PAGESHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USERSHARE_TOGROUP" ADD CONSTRAINT "Comment_USERSHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USERSHARE_TOGROUP" ADD CONSTRAINT "Comment_USERSHARE_TOGROUP_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_USERSHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGESHARE_TOGROUP" ADD CONSTRAINT "Comment_PAGESHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGESHARE_TOGROUP" ADD CONSTRAINT "Comment_PAGESHARE_TOGROUP_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_PAGESHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_USER" ADD CONSTRAINT "CommentReactions_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_USER" ADD CONSTRAINT "CommentReactions_USER_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_PAGE" ADD CONSTRAINT "CommentReactions_PAGE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_PAGE" ADD CONSTRAINT "CommentReactions_PAGE_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_GROUP" ADD CONSTRAINT "CommentReactions_GROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_GROUP" ADD CONSTRAINT "CommentReactions_GROUP_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_USERSHARE" ADD CONSTRAINT "CommentReactions_USERSHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_USERSHARE" ADD CONSTRAINT "CommentReactions_USERSHARE_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USERSHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_PAGESHARE" ADD CONSTRAINT "CommentReactions_PAGESHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_PAGESHARE" ADD CONSTRAINT "CommentReactions_PAGESHARE_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGESHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction_USERSHARE_TOGROUP" ADD CONSTRAINT "CommentReaction_USERSHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction_USERSHARE_TOGROUP" ADD CONSTRAINT "CommentReaction_USERSHARE_TOGROUP_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USERSHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction_PAGESHARE_TOGROUP" ADD CONSTRAINT "CommentReaction_PAGESHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction_PAGESHARE_TOGROUP" ADD CONSTRAINT "CommentReaction_PAGESHARE_TOGROUP_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGESHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USER" ADD CONSTRAINT "ReplyReactions_USER_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USER" ADD CONSTRAINT "ReplyReactions_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGE" ADD CONSTRAINT "ReplyReactions_PAGE_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGE" ADD CONSTRAINT "ReplyReactions_PAGE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_GROUP" ADD CONSTRAINT "ReplyReactions_GROUP_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_GROUP" ADD CONSTRAINT "ReplyReactions_GROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USERSHARE" ADD CONSTRAINT "ReplyReactions_USERSHARE_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_USERSHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USERSHARE" ADD CONSTRAINT "ReplyReactions_USERSHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGESHARE" ADD CONSTRAINT "ReplyReactions_PAGESHARE_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_PAGESHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGESHARE" ADD CONSTRAINT "ReplyReactions_PAGESHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USERSHARE_TOGROUP" ADD CONSTRAINT "ReplyReactions_USERSHARE_TOGROUP_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_USERSHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USERSHARE_TOGROUP" ADD CONSTRAINT "ReplyReactions_USERSHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGESHARE_TOGROUP" ADD CONSTRAINT "ReplyReactions_PAGESHARE_TOGROUP_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_PAGESHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGESHARE_TOGROUP" ADD CONSTRAINT "ReplyReactions_PAGESHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USER" ADD CONSTRAINT "PostReactions_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USER" ADD CONSTRAINT "PostReactions_USER_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_PAGE" ADD CONSTRAINT "PostReactions_PAGE_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_PAGE" ADD CONSTRAINT "PostReactions_PAGE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_GROUP" ADD CONSTRAINT "PostReactions_GROUP_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_GROUP" ADD CONSTRAINT "PostReactions_GROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USERSHARE" ADD CONSTRAINT "PostReactions_USERSHARE_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_USERSHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USERSHARE" ADD CONSTRAINT "PostReactions_USERSHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_PAGESHARE" ADD CONSTRAINT "PostReactions_PAGESHARE_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_PAGESHARE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_PAGESHARE" ADD CONSTRAINT "PostReactions_PAGESHARE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USERSHARE_TOGROUP" ADD CONSTRAINT "PostReactions_USERSHARE_TOGROUP_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_USERSHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USERSHARE_TOGROUP" ADD CONSTRAINT "PostReactions_USERSHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_PAGESHARE_TOGROUP" ADD CONSTRAINT "PostReactions_PAGESHARE_TOGROUP_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post_PAGESHARE_TOGROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_PAGESHARE_TOGROUP" ADD CONSTRAINT "PostReactions_PAGESHARE_TOGROUP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks_GROUP" ADD CONSTRAINT "SocialLinks_GROUP_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_GROUP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Websites_GROUP" ADD CONSTRAINT "Websites_GROUP_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_GROUP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRules" ADD CONSTRAINT "GroupRules_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_GROUP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks_PAGE" ADD CONSTRAINT "SocialLinks_PAGE_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_PAGE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Websites_PAGE" ADD CONSTRAINT "Websites_PAGE_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_PAGE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile_USER" ADD CONSTRAINT "Profile_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousCity" ADD CONSTRAINT "PreviousCity_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks_USER" ADD CONSTRAINT "SocialLinks_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collges_USER" ADD CONSTRAINT "Collges_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concentraions" ADD CONSTRAINT "Concentraions_collgeProfileId_fkey" FOREIGN KEY ("collgeProfileId") REFERENCES "Collges_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Websites_USER" ADD CONSTRAINT "Websites_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schools_USER" ADD CONSTRAINT "Schools_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works_USER" ADD CONSTRAINT "Works_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reel_USER" ADD CONSTRAINT "Reel_USER_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USERREEL" ADD CONSTRAINT "PostReactions_USERREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USERREEL" ADD CONSTRAINT "PostReactions_USERREEL_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "Reel_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USERREEL" ADD CONSTRAINT "Comment_USERREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USERREEL" ADD CONSTRAINT "Comment_USERREEL_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "Reel_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction_USERREEL" ADD CONSTRAINT "CommentReaction_USERREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction_USERREEL" ADD CONSTRAINT "CommentReaction_USERREEL_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USERREEL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USERREEL" ADD CONSTRAINT "Reply_USERREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USERREEL" ADD CONSTRAINT "Reply_USERREEL_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USERREEL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USERREEL" ADD CONSTRAINT "ReplyReactions_USERREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USERREEL" ADD CONSTRAINT "ReplyReactions_USERREEL_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_USERREEL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reel_PAGE" ADD CONSTRAINT "Reel_PAGE_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReaction_PAGEREEL" ADD CONSTRAINT "PostReaction_PAGEREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReaction_PAGEREEL" ADD CONSTRAINT "PostReaction_PAGEREEL_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "Reel_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGEREEL" ADD CONSTRAINT "Comment_PAGEREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGEREEL" ADD CONSTRAINT "Comment_PAGEREEL_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "Reel_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction_PAGEREEL" ADD CONSTRAINT "CommentReaction_PAGEREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction_PAGEREEL" ADD CONSTRAINT "CommentReaction_PAGEREEL_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGEREEL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGEREEL" ADD CONSTRAINT "Reply_PAGEREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGEREEL" ADD CONSTRAINT "Reply_PAGEREEL_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGEREEL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGEREEL" ADD CONSTRAINT "ReplyReactions_PAGEREEL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGEREEL" ADD CONSTRAINT "ReplyReactions_PAGEREEL_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_PAGEREEL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USER_MEDIA" ADD CONSTRAINT "Comment_USER_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_USER_MEDIA" ADD CONSTRAINT "Comment_USER_MEDIA_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Medias_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USER_MEDIA" ADD CONSTRAINT "Reply_USER_MEDIA_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USER_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_USER_MEDIA" ADD CONSTRAINT "Reply_USER_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USER_MEDIA" ADD CONSTRAINT "PostReactions_USER_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_USER_MEDIA" ADD CONSTRAINT "PostReactions_USER_MEDIA_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Medias_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_USER_MEDIA" ADD CONSTRAINT "CommentReactions_USER_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_USER_MEDIA" ADD CONSTRAINT "CommentReactions_USER_MEDIA_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_USER_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USER_MEDIA" ADD CONSTRAINT "ReplyReactions_USER_MEDIA_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_USER_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_USER_MEDIA" ADD CONSTRAINT "ReplyReactions_USER_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGE_MEDIA" ADD CONSTRAINT "Comment_PAGE_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_PAGE_MEDIA" ADD CONSTRAINT "Comment_PAGE_MEDIA_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Medias_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGE_MEDIA" ADD CONSTRAINT "Reply_PAGE_MEDIA_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGE_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_PAGE_MEDIA" ADD CONSTRAINT "Reply_PAGE_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_PAGE_MEDIA" ADD CONSTRAINT "PostReactions_PAGE_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_PAGE_MEDIA" ADD CONSTRAINT "PostReactions_PAGE_MEDIA_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Medias_PAGE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_PAGE_MEDIA" ADD CONSTRAINT "CommentReactions_PAGE_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_PAGE_MEDIA" ADD CONSTRAINT "CommentReactions_PAGE_MEDIA_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_PAGE_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGE_MEDIA" ADD CONSTRAINT "ReplyReactions_PAGE_MEDIA_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_PAGE_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_PAGE_MEDIA" ADD CONSTRAINT "ReplyReactions_PAGE_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_GROUP_MEDIA" ADD CONSTRAINT "Comment_GROUP_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_GROUP_MEDIA" ADD CONSTRAINT "Comment_GROUP_MEDIA_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Medias_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_GROUP_MEDIA" ADD CONSTRAINT "Reply_GROUP_MEDIA_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_GROUP_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply_GROUP_MEDIA" ADD CONSTRAINT "Reply_GROUP_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_GROUP_MEDIA" ADD CONSTRAINT "PostReactions_GROUP_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReactions_GROUP_MEDIA" ADD CONSTRAINT "PostReactions_GROUP_MEDIA_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Medias_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_GROUP_MEDIA" ADD CONSTRAINT "CommentReactions_GROUP_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReactions_GROUP_MEDIA" ADD CONSTRAINT "CommentReactions_GROUP_MEDIA_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment_GROUP_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_GROUP_MEDIA" ADD CONSTRAINT "ReplyReactions_GROUP_MEDIA_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply_GROUP_MEDIA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReactions_GROUP_MEDIA" ADD CONSTRAINT "ReplyReactions_GROUP_MEDIA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToUser" ADD CONSTRAINT "_PageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToUser" ADD CONSTRAINT "_PageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_USERToUser" ADD CONSTRAINT "_Post_USERToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Post_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_USERToUser" ADD CONSTRAINT "_Post_USERToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD CONSTRAINT "_admins_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD CONSTRAINT "_admins_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_moderators" ADD CONSTRAINT "_moderators_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile_GROUP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_moderators" ADD CONSTRAINT "_moderators_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
