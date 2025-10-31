import { PrepareFeedType } from "../handler";
import { feedPreparer } from "./libs/feed";
import { mediaPreparer } from "./libs/media";
import { prepareMedia } from "./media";

export const prepareFeed = async (feeds: PrepareFeedType) => {
  return feeds.map(async (feed: PrepareFeedType[0]) => {
    return {
      ...feed,
      reactions: feedPreparer.prepareReactions(feed.reactions),
      gReactions: await feedPreparer.prepareGReactions(feed.id),
      comments: feedPreparer.prepareComments(feed.comments),
      userPost: prepareMedia(feed.userPost?.medias),
      pagePost: prepareMedia(feed.pagePost?.medias),
      groupPost: prepareMedia(feed.groupPost?.medias),
    };
  });
};
