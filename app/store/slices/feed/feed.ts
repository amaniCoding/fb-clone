import { FeedsType } from "@/app/api/feeder/[page]/lib";
import { ReactionType, PostType } from "@/app/generated/prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type updateFeedWithReactPayLoadType = {
  gReactions:
    | {
        reactionType: ReactionType;
        count: number;
      }[]
    | undefined;
  feedId: string | undefined;
  postType: PostType | undefined;
  reactionType: ReactionType | undefined;
};
export type FeedResponseType = {
  feeds: FeedsType[];
};
// Define a type for the slice state
interface FeedState {
  feeds: {
    feeds: FeedsType[] | undefined;
  };
}

const initialState: FeedState = {
  feeds: {
    feeds: [],
  },
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    setFeeds: (state, action: PayloadAction<FeedResponseType>) => {
      state.feeds.feeds = [...state.feeds.feeds!, ...action.payload.feeds];
    },

    addFeed: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    updateFeedWithReact: (
      state,
      action: PayloadAction<updateFeedWithReactPayLoadType | undefined>
    ) => {
      const feed = state.feeds.feeds?.find((feed) => {
        return feed.feedId === action.payload?.feedId;
      });
      if (action.payload?.postType === "oUserPost") {
        feed!.userPost!.oUserPost!._gReactions = action.payload.gReactions;
        feed!.userPost!.oUserPost!._isReacted!.reactionType =
          action.payload.reactionType!;
      }
      if (action.payload?.postType === "userSharePost") {
        feed!.userPost!.userSharePost!._gReactions = action.payload.gReactions;
        feed!.userPost!.userSharePost!._isReacted!.reactionType =
          action.payload.reactionType!;
      }
      if (action.payload?.postType === "oPagePost") {
        feed!.pagePost!.oPagePost!._gReactions = action.payload.gReactions;
        feed!.pagePost!.oPagePost!._isReacted!.reactionType =
          action.payload.reactionType!;
      }
      if (action.payload?.postType === "pageSharePost") {
        feed!.pagePost!.pageSharePost!._gReactions = action.payload.gReactions;
        feed!.pagePost!.pageSharePost!._isReacted!.reactionType =
          action.payload.reactionType!;
      }
      if (action.payload?.postType === "oGroupPost") {
        feed!.groupPost!.oGroupPost!._gReactions = action.payload.gReactions;
        feed!.groupPost!.oGroupPost!._isReacted!.reactionType =
          action.payload.reactionType!;
      }
      if (action.payload?.postType === "toGroupSharedPost") {
        feed!.groupPost!.toGroupSharedPost!._gReactions =
          action.payload.gReactions;
        feed!.groupPost!.toGroupSharedPost!._isReacted!.reactionType =
          action.payload.reactionType!;
      }
    },
  },
});

export const { setFeeds, addFeed, updateFeedWithReact } = feedSlice.actions;

export default feedSlice.reducer;
