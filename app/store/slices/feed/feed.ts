import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "@/app/apis/feeditem/comments/[posttype]/[postid]/[page]/lib";
import {
  ReactionModalHeader,
  ReactionModalReactors,
} from "@/app/apis/feeder/[page]/types";
import { FeedsType } from "@/app/apis/feeder/[page]/lib";
import { stat } from "fs";

interface UploadedMediaType {
  url: string;
  type: string;
}

type OpenCommentModal = {
  isOpen: boolean;
  type: "feed" | "media";
  feedId: string;
  mediaId?: string;
  posType?: "user" | "page" | "group" | undefined;
};

type OpenReactionModal = {
  isOpen: boolean;
  currentReactionType: string;
  type: "feed" | "media";
  feedId: string;
  mediaId?: string;
  commentId: string;
  replyId: string;
  rReplyId: string;
  posType?: "user" | "page" | "group" | undefined;
};

export type feedResponseType = {
  loading: boolean;
  error: string;
  page: number;
  feeds: FeedsType[];
  totalRows: number;
  totalPages: number;
};
// Define a type for the slice state
interface FeedState {
  commentModal: {
    isOpen: boolean;
    refs: {
      loading: boolean;
      page: number;
      error: string;
      totalRows: number | undefined;
      totalPages: number | undefined;
      comments: any[];
    };
    type: "feed" | "media" | undefined;
    params: {
      feedId: string;
      mediaId: string | undefined;
      postType: "user" | "page" | "group" | undefined;
    };
  };

  reactionModal: {
    isOpen: boolean;
    url: string | undefined;
    type: "feed" | "media" | undefined;
    fromWhat: "feed" | "media" | "comment" | "reply" | "replyreply" | undefined;
    params: {
      feedId: string | undefined;
      mediaId: string | undefined;
      commentId: string | undefined;
      replyId: string | undefined;
      rReplyId: string | undefined;
      postType: "user" | "page" | "group" | undefined;
      currentReactionType: string | undefined;
    };
    refs: {
      header: {
        loading: boolean;
        currentReactionType: string | undefined;
        gReactions: [];
      };
      body: {
        loading: boolean;
        page: number;
        error: string;
        reactors: [];
        totalRows: number | undefined;
        totalPages: number | undefined;
      };
    };
  };
  feeds: {
    loading: boolean;
    page: number;
    feeds: FeedsType[] | undefined;
    totalRows: number;
    totalPages: number;
  };
  network: {
    isOnline: boolean;
    status: string;
    showNumber: number;
  };
}

// Define the initial state using that type
const initialState: FeedState = {
  commentModal: {
    isOpen: false,
    params: {
      feedId: "",
      mediaId: undefined,
      postType: undefined,
    },
    refs: {
      loading: false,
      page: 1,
      error: "",
      totalPages: undefined,
      totalRows: undefined,
      comments: [],
    },
    type: undefined,
  },
  reactionModal: {
    url: "",
    isOpen: false,
    fromWhat: undefined,
    type: undefined,
    params: {
      feedId: undefined,
      commentId: undefined,
      mediaId: undefined,
      replyId: undefined,
      rReplyId: undefined,
      postType: undefined,
      currentReactionType: undefined,
    },
    refs: {
      header: {
        currentReactionType: undefined,
        loading: false,
        gReactions: [],
      },
      body: {
        loading: false,
        error: "",
        page: 1,
        totalPages: undefined,
        totalRows: undefined,
        reactors: [],
      },
    },
  },
  network: {
    isOnline: navigator.onLine,
    status: "",
    showNumber: 0,
  },
  feeds: {
    feeds: [],
    loading: true,
    page: 1,
    totalPages: 0,
    totalRows: 0,
  },
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    setNetWorkError: (
      state,
      action: PayloadAction<{
        isOnline: boolean;
        status: string;
        showNumber: number;
      }>
    ) => {
      state.network = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.feeds.loading = action.payload;
    },

    setFeeds: (
      state,
      action: PayloadAction<{ firstTime: boolean; result: feedResponseType }>
    ) => {
      if (!action.payload.firstTime) {
        state.feeds.feeds = [
          ...state.feeds.feeds!,
          ...action.payload.result.feeds,
        ];
      } else {
        state.feeds = action.payload.result;
      }
    },

    addFeed: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    updatePage: (state, action: PayloadAction<number>) => {
      state.feeds.page = state.feeds.page + 1;
    },

    updateTotalPagesAndRows: (
      state,
      action: PayloadAction<{ totalPages: number; totalRows: number }>
    ) => {
      state.feeds.totalPages = action.payload.totalPages;
      state.feeds.totalRows = action.payload.totalRows;
    },

    /** comment modal */

    openCommentModal: (state, action: PayloadAction<OpenCommentModal>) => {
      state.commentModal.isOpen = action.payload.isOpen;
      (state.commentModal.params.feedId = action.payload.feedId),
        (state.commentModal.params.mediaId = action.payload.mediaId),
        (state.commentModal.params.postType = action.payload.posType);
    },

    setPage_Comment: (
      state,
      action: PayloadAction<{
        newPage: number;
      }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) => feed.id === state.commentModal.params.feedId
      );
      switch (state.commentModal.type) {
        case "feed":
          {
            if (currentFeed) {
              currentFeed._comments.modal.page = action.payload.newPage;
              state.commentModal.refs.page = currentFeed._comments.modal.page;
            }
          }

          break;
        case "media":
          switch (state.commentModal.params.postType) {
            case "user":
              {
                if (currentFeed) {
                  const medias = currentFeed.userPost.medias;
                  if (medias) {
                    const currentMedia = medias.find(
                      (media) => media.id === state.commentModal.params.mediaId
                    );
                    if (currentMedia) {
                      currentMedia._comments.modal.page =
                        action.payload.newPage;
                      state.commentModal.refs.page =
                        currentMedia._comments.modal.page;
                    }
                  }
                }
              }
              break;
            case "page":
              {
                if (currentFeed) {
                  const medias = currentFeed.pagePost.medias;
                  if (medias) {
                    const currentMedia = medias.find(
                      (media) => media.id === state.commentModal.params.mediaId
                    );
                    if (currentMedia) {
                      currentMedia._comments.modal.page =
                        action.payload.newPage;
                      state.commentModal.refs.page =
                        currentMedia._comments.modal.page;
                    }
                  }
                }
              }

              break;

            case "group": {
              if (currentFeed) {
                const medias = currentFeed.groupPost.medias;
                if (medias) {
                  const currentMedia = medias.find(
                    (media) => media.id === state.commentModal.params.mediaId
                  );
                  if (currentMedia) {
                    currentMedia._comments.modal.page = action.payload.newPage;
                    state.commentModal.refs.page =
                      currentMedia._comments.modal.page;
                  }
                }
              }
            }

            default:
              break;
          }

        default:
          break;
      }
    },

    setLoading_Comment: (
      state,
      action: PayloadAction<{
        newLoading: boolean;
      }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) => feed.id === state.commentModal.params.feedId
      );
      switch (state.commentModal.type) {
        case "feed":
          {
            if (currentFeed) {
              currentFeed._comments.modal.loading = action.payload.newLoading;
              state.commentModal.refs.loading =
                currentFeed._comments.modal.loading;
            }
          }

          break;
        case "media":
          switch (state.commentModal.params.postType) {
            case "user":
              {
                if (currentFeed) {
                  const medias = currentFeed.userPost.medias;
                  if (medias) {
                    const currentMedia = medias.find(
                      (media) => media.id === state.commentModal.params.mediaId
                    );
                    if (currentMedia) {
                      currentMedia._comments.modal.loading =
                        action.payload.newLoading;
                      state.commentModal.refs.loading =
                        currentMedia._comments.modal.loading;
                    }
                  }
                }
              }
              break;
            case "page":
              {
                if (currentFeed) {
                  const medias = currentFeed.pagePost.medias;
                  if (medias) {
                    const currentMedia = medias.find(
                      (media) => media.id === state.commentModal.params.mediaId
                    );
                    if (currentMedia) {
                      currentMedia._comments.modal.loading =
                        action.payload.newLoading;
                      state.commentModal.refs.loading =
                        currentMedia._comments.modal.loading;
                    }
                  }
                }
              }

              break;

            case "group": {
              if (currentFeed) {
                const medias = currentFeed.groupPost.medias;
                if (medias) {
                  const currentMedia = medias.find(
                    (media) => media.id === state.commentModal.params.mediaId
                  );
                  if (currentMedia) {
                    currentMedia._comments.modal.loading =
                      action.payload.newLoading;
                    state.commentModal.refs.loading =
                      currentMedia._comments.modal.loading;
                  }
                }
              }
            }

            default:
              break;
          }

        default:
          break;
      }
    },

    setError_Comment: (
      state,
      action: PayloadAction<{
        newError: string;
      }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) => feed.id === state.commentModal.params.feedId
      );
      switch (state.commentModal.type) {
        case "feed":
          {
            if (currentFeed) {
              currentFeed._comments.modal.error = action.payload.newError;
              state.commentModal.refs.error = currentFeed._comments.modal.error;
            }
          }

          break;
        case "media":
          switch (state.commentModal.params.postType) {
            case "user":
              {
                if (currentFeed) {
                  const medias = currentFeed.userPost.medias;
                  if (medias) {
                    const currentMedia = medias.find(
                      (media) => media.id === state.commentModal.params.mediaId
                    );
                    if (currentMedia) {
                      currentMedia._comments.modal.error =
                        action.payload.newError;
                      state.commentModal.refs.error =
                        currentMedia._comments.modal.error;
                    }
                  }
                }
              }
              break;
            case "page":
              {
                if (currentFeed) {
                  const medias = currentFeed.pagePost.medias;
                  if (medias) {
                    const currentMedia = medias.find(
                      (media) => media.id === state.commentModal.params.mediaId
                    );
                    if (currentMedia) {
                      currentMedia._comments.modal.error =
                        action.payload.newError;
                      state.commentModal.refs.error =
                        currentMedia._comments.modal.error;
                    }
                  }
                }
              }

              break;

            case "group": {
              if (currentFeed) {
                const medias = currentFeed.groupPost.medias;
                if (medias) {
                  const currentMedia = medias.find(
                    (media) => media.id === state.commentModal.params.mediaId
                  );
                  if (currentMedia) {
                    currentMedia._comments.modal.error =
                      action.payload.newError;
                    state.commentModal.refs.error =
                      currentMedia._comments.modal.error;
                  }
                }
              }
            }

            default:
              break;
          }

        default:
          break;
      }
    },

    AddComments: (
      state,
      action: PayloadAction<{
        newComments: any[];
      }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) => feed.id === state.commentModal.params.feedId
      );
      switch (state.commentModal.type) {
        case "feed":
          {
            if (currentFeed) {
              currentFeed._comments.modal.commentors = [
                ...currentFeed._comments.modal.commentors,
                ...action.payload.newComments,
              ];
              state.commentModal.refs.comments =
                currentFeed._comments.modal.commentors;
            }
          }

          break;
        case "media":
          switch (state.commentModal.params.postType) {
            case "user":
              {
                if (currentFeed) {
                  const medias = currentFeed.userPost.medias;
                  if (medias) {
                    const currentMedia = medias.find(
                      (media) => media.id === state.commentModal.params.mediaId
                    );
                    if (currentMedia) {
                      currentMedia._comments.modal.commentors = [
                        ...currentMedia._comments.modal.commentors,
                        action.payload.newComments,
                      ];
                      state.commentModal.refs.comments =
                        currentMedia._comments.modal.commentors;
                    }
                  }
                }
              }
              break;
            case "page":
              {
                if (currentFeed) {
                  const medias = currentFeed.pagePost.medias;
                  if (medias) {
                    const currentMedia = medias.find(
                      (media) => media.id === state.commentModal.params.mediaId
                    );
                    if (currentMedia) {
                      currentMedia._comments.modal.commentors = [
                        ...currentMedia._comments.modal.commentors,
                        action.payload.newComments,
                      ];
                      state.commentModal.refs.comments =
                        currentMedia._comments.modal.commentors;
                    }
                  }
                }
              }

              break;

            case "group": {
              if (currentFeed) {
                const medias = currentFeed.groupPost.medias;
                if (medias) {
                  const currentMedia = medias.find(
                    (media) => media.id === state.commentModal.params.mediaId
                  );
                  if (currentMedia) {
                    currentMedia._comments.modal.commentors = [
                      ...currentMedia._comments.modal.commentors,
                      action.payload.newComments,
                    ];
                    state.commentModal.refs.comments =
                      currentMedia._comments.modal.commentors;
                  }
                }
              }
            }

            default:
              break;
          }

        default:
          break;
      }
    },

    // reactionmodal
    openReactionModal: (state, action: PayloadAction<OpenReactionModal>) => {
      state.reactionModal.isOpen = action.payload.isOpen;
      (state.reactionModal.params.feedId = action.payload.feedId),
        (state.reactionModal.params.mediaId = action.payload.mediaId),
        (state.reactionModal.params.commentId = action.payload.commentId);
      state.reactionModal.params.replyId = action.payload.replyId;
      state.reactionModal.params.rReplyId = action.payload.rReplyId;
      state.reactionModal.params.currentReactionType =
        action.payload.currentReactionType;
    },

    setLoading_Reaction: (
      state,
      action: PayloadAction<{ newLoading: boolean }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) => feed.id === state.reactionModal.params.mediaId
      );
      if (currentFeed) {
        if (state.reactionModal.type === "feed") {
          if (state.reactionModal.fromWhat === "feed") {
            currentFeed._comments.modal.loading = action.payload.newLoading;
          } else if (state.reactionModal.fromWhat === "comment") {
            const currentComment = currentFeed._comments.modal.commentors.find(
              (co) => co.id === state.reactionModal.params.commentId
            );
          }
        }
      }
    },
  },
});

export const {
  setNetWorkError,
  setFeeds,
  setLoading,
  addFeed,
  updatePage,
  updateTotalPagesAndRows,

  /** commentmodal */
  openCommentModal,
  setPage_Comment,
  //setLoading_Comment,
  //setError_Comment,
  //setComment_Comment,
} = feedSlice.actions;

export default feedSlice.reducer;
