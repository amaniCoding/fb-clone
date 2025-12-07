-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'custom');

-- CreateEnum
CREATE TYPE "Audinece" AS ENUM ('public', 'friends', 'custom');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video');

-- CreateEnum
CREATE TYPE "MessageMediaType" AS ENUM ('image', 'video', 'document');

-- CreateEnum
CREATE TYPE "SuperAudinece" AS ENUM ('friendsExcept', 'specificFriends', 'customList');

-- CreateEnum
CREATE TYPE "FeedPostType" AS ENUM ('user', 'group', 'page');

-- CreateEnum
CREATE TYPE "UserPostType" AS ENUM ('original', 'share');

-- CreateEnum
CREATE TYPE "PagePostType" AS ENUM ('original', 'share');

-- CreateEnum
CREATE TYPE "GroupPostType" AS ENUM ('original', 'share');

-- CreateEnum
CREATE TYPE "ShareType" AS ENUM ('user', 'group', 'page', 'media');

-- CreateEnum
CREATE TYPE "ToGroupSharerType" AS ENUM ('user', 'page');

-- CreateEnum
CREATE TYPE "MediaOwnerType" AS ENUM ('user', 'page', 'group');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('like', 'love', 'sad', 'angry', 'care', 'haha', 'wow');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('oUserPost', 'oPagePost', 'oGroupPost', 'userSharePost', 'pageSharePost', 'toGroupSharedPost');

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
CREATE TABLE "UserPost" (
    "id" TEXT NOT NULL,
    "postType" "UserPostType" NOT NULL,
    "oUserPostId" TEXT,
    "userSharePostId" TEXT,

    CONSTRAINT "UserPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OUserPost" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'oUserPost',
    "userId" TEXT NOT NULL,
    "content" TEXT,
    "location" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OUserPost_pkey" PRIMARY KEY ("id")
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
    "postType" "PostType" NOT NULL DEFAULT 'userSharePost',
    "userId" TEXT NOT NULL,
    "shareWhat" "ShareType" NOT NULL,
    "content" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "audience" "Audinece" NOT NULL DEFAULT 'friends',
    "location" TEXT,
    "oUserPostId" TEXT,
    "oPagePostId" TEXT,
    "oGroupPostId" TEXT,
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
CREATE TABLE "Firends" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
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
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupPost" (
    "id" TEXT NOT NULL,
    "postType" "GroupPostType" NOT NULL,
    "oGroupPostId" TEXT,
    "toGroupSharePostId" TEXT,

    CONSTRAINT "GroupPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OGroupPost" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'oGroupPost',
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "content" TEXT,
    "location" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "audience" "Audinece" DEFAULT 'public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OGroupPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToGroupSharePost" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'toGroupSharedPost',
    "userId" TEXT,
    "pageId" TEXT,
    "groupId" TEXT NOT NULL,
    "shareWhat" "ShareType" NOT NULL,
    "sharer" "ToGroupSharerType" NOT NULL,
    "content" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "location" TEXT,
    "oUserPostId" TEXT,
    "oPagePostId" TEXT,
    "oGroupPostId" TEXT,
    "mediaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToGroupSharePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupRules" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupRules_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "GroupMembers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "profilePicture" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PagePost" (
    "id" TEXT NOT NULL,
    "postType" "PagePostType" NOT NULL,
    "oPagePostId" TEXT,
    "pageSharePostId" TEXT,

    CONSTRAINT "PagePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OPagePost" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'oPagePost',
    "pageId" TEXT NOT NULL,
    "content" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "audience" "Audinece",
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OPagePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSharePost" (
    "id" TEXT NOT NULL,
    "postType" "PostType" NOT NULL DEFAULT 'pageSharePost',
    "pageId" TEXT NOT NULL,
    "shareWhat" "ShareType" NOT NULL,
    "content" TEXT,
    "doing" TEXT,
    "doingWhat" TEXT,
    "audience" "Audinece",
    "location" TEXT,
    "oUserPostId" TEXT,
    "oPagePostId" TEXT,
    "oGroupPostId" TEXT,
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
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "feedId" TEXT,
    "owner" "MediaOwnerType" NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "MessageMedias_USER" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "type" "MessageMediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageMedias_USER_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "MessageMedias_PAGE" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "type" "MessageMediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageMedias_PAGE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "pageId" TEXT,
    "content" TEXT,
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
    "postType" "FeedPostType" NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "userSharePostId" TEXT,
    "pageSharePostId" TEXT,
    "toGroupSharePostId" TEXT,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userPostId" TEXT,
    "pagePostId" TEXT,
    "groupPostId" TEXT,
    "userSharePostId" TEXT,
    "pageSharePostId" TEXT,
    "toGroupSharePostId" TEXT,
    "reactionType" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReaction" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReaction" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReply" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyReplyReactions" (
    "id" TEXT NOT NULL,
    "replyReplyId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReplyReplyReactions_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UserPost_oUserPostId_key" ON "UserPost"("oUserPostId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPost_userSharePostId_key" ON "UserPost"("userSharePostId");

-- CreateIndex
CREATE UNIQUE INDEX "OUserPost_id_key" ON "OUserPost"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PreviousCity_profileId_key" ON "PreviousCity"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupPost_oGroupPostId_key" ON "GroupPost"("oGroupPostId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupPost_toGroupSharePostId_key" ON "GroupPost"("toGroupSharePostId");

-- CreateIndex
CREATE UNIQUE INDEX "PagePost_oPagePostId_key" ON "PagePost"("oPagePostId");

-- CreateIndex
CREATE UNIQUE INDEX "PagePost_pageSharePostId_key" ON "PagePost"("pageSharePostId");

-- CreateIndex
CREATE UNIQUE INDEX "PageFollow_pageId1_pageId2_key" ON "PageFollow"("pageId1", "pageId2");

-- CreateIndex
CREATE UNIQUE INDEX "Feed_userPostId_key" ON "Feed"("userPostId");

-- CreateIndex
CREATE UNIQUE INDEX "Feed_pagePostId_key" ON "Feed"("pagePostId");

-- CreateIndex
CREATE UNIQUE INDEX "Feed_groupPostId_key" ON "Feed"("groupPostId");

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_oUserPostId_fkey" FOREIGN KEY ("oUserPostId") REFERENCES "OUserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userSharePostId_fkey" FOREIGN KEY ("userSharePostId") REFERENCES "UserSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OUserPost" ADD CONSTRAINT "OUserPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followingUserId_fkey" FOREIGN KEY ("followingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_oUserPostId_fkey" FOREIGN KEY ("oUserPostId") REFERENCES "OUserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_oPagePostId_fkey" FOREIGN KEY ("oPagePostId") REFERENCES "OPagePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSharePost" ADD CONSTRAINT "UserSharePost_oGroupPostId_fkey" FOREIGN KEY ("oGroupPostId") REFERENCES "OGroupPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "OUserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_userSharePostId_fkey" FOREIGN KEY ("userSharePostId") REFERENCES "UserSharePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Firends" ADD CONSTRAINT "Firends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_sendId_fkey" FOREIGN KEY ("sendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousCity" ADD CONSTRAINT "PreviousCity_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks_USER" ADD CONSTRAINT "SocialLinks_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collges_USER" ADD CONSTRAINT "Collges_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concentraions" ADD CONSTRAINT "Concentraions_collgeProfileId_fkey" FOREIGN KEY ("collgeProfileId") REFERENCES "Collges_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Websites_USER" ADD CONSTRAINT "Websites_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schools_USER" ADD CONSTRAINT "Schools_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works_USER" ADD CONSTRAINT "Works_USER_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPost" ADD CONSTRAINT "GroupPost_oGroupPostId_fkey" FOREIGN KEY ("oGroupPostId") REFERENCES "OGroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPost" ADD CONSTRAINT "GroupPost_toGroupSharePostId_fkey" FOREIGN KEY ("toGroupSharePostId") REFERENCES "ToGroupSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OGroupPost" ADD CONSTRAINT "OGroupPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OGroupPost" ADD CONSTRAINT "OGroupPost_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_oUserPostId_fkey" FOREIGN KEY ("oUserPostId") REFERENCES "OUserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_oPagePostId_fkey" FOREIGN KEY ("oPagePostId") REFERENCES "OPagePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToGroupSharePost" ADD CONSTRAINT "ToGroupSharePost_oGroupPostId_fkey" FOREIGN KEY ("oGroupPostId") REFERENCES "OGroupPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "GroupMembers" ADD CONSTRAINT "GroupMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembers" ADD CONSTRAINT "GroupMembers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePost" ADD CONSTRAINT "PagePost_oPagePostId_fkey" FOREIGN KEY ("oPagePostId") REFERENCES "OPagePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePost" ADD CONSTRAINT "PagePost_pageSharePostId_fkey" FOREIGN KEY ("pageSharePostId") REFERENCES "PageSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPagePost" ADD CONSTRAINT "OPagePost_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_oUserPostId_fkey" FOREIGN KEY ("oUserPostId") REFERENCES "OUserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_oPagePostId_fkey" FOREIGN KEY ("oPagePostId") REFERENCES "OPagePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSharePost" ADD CONSTRAINT "PageSharePost_oGroupPostId_fkey" FOREIGN KEY ("oGroupPostId") REFERENCES "OGroupPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPageFollow" ADD CONSTRAINT "UserPageFollow_paegId_fkey" FOREIGN KEY ("paegId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPageFollow" ADD CONSTRAINT "UserPageFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageFollow" ADD CONSTRAINT "PageFollow_pageId1_fkey" FOREIGN KEY ("pageId1") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageFollow" ADD CONSTRAINT "PageFollow_pageId2_fkey" FOREIGN KEY ("pageId2") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "OUserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "OPagePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "OGroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_USER" ADD CONSTRAINT "Message_USER_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_USER" ADD CONSTRAINT "Message_USER_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMedias_USER" ADD CONSTRAINT "MessageMedias_USER_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message_USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_PAGE" ADD CONSTRAINT "Message_PAGE_senderId_page_fkey" FOREIGN KEY ("senderId_page") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_PAGE" ADD CONSTRAINT "Message_PAGE_recieverId_page_fkey" FOREIGN KEY ("recieverId_page") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_PAGE" ADD CONSTRAINT "Message_PAGE_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_PAGE" ADD CONSTRAINT "Message_PAGE_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMedias_PAGE" ADD CONSTRAINT "MessageMedias_PAGE_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message_PAGE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryMedia" ADD CONSTRAINT "StoryMedia_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "UserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "PagePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "OUserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "OPagePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "OGroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userSharePostId_fkey" FOREIGN KEY ("userSharePostId") REFERENCES "UserSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_pageSharePostId_fkey" FOREIGN KEY ("pageSharePostId") REFERENCES "PageSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_toGroupSharePostId_fkey" FOREIGN KEY ("toGroupSharePostId") REFERENCES "ToGroupSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userPostId_fkey" FOREIGN KEY ("userPostId") REFERENCES "OUserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_pagePostId_fkey" FOREIGN KEY ("pagePostId") REFERENCES "OPagePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "OGroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userSharePostId_fkey" FOREIGN KEY ("userSharePostId") REFERENCES "UserSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_pageSharePostId_fkey" FOREIGN KEY ("pageSharePostId") REFERENCES "PageSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_toGroupSharePostId_fkey" FOREIGN KEY ("toGroupSharePostId") REFERENCES "ToGroupSharePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReaction" ADD CONSTRAINT "ReplyReaction_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReaction" ADD CONSTRAINT "ReplyReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReply" ADD CONSTRAINT "ReplyReply_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReply" ADD CONSTRAINT "ReplyReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReplyReactions" ADD CONSTRAINT "ReplyReplyReactions_replyReplyId_fkey" FOREIGN KEY ("replyReplyId") REFERENCES "ReplyReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReplyReactions" ADD CONSTRAINT "ReplyReplyReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
