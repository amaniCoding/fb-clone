import prisma from "@/app/libs/prisma";
import { ReactionModalHeader, ReactionModalReactors } from "../../types";
import { PrepareFeedType, ReplyReplyType, ReplyType } from "../../handler";
import { feedPreparer } from "./lib";

export const prepareFeed = async (feeds: PrepareFeedType) => {
  return feeds.map(async (feed: PrepareFeedType[0]) => {
    return {
      ...feed,
      reactions: feedPreparer.prepareReactions(feed.reactions),
      gReactions: await feedPreparer.prepareGReactions(feed.id),
      comments: feedPreparer.prepareComments(feed.comments),
    };
  });
};
