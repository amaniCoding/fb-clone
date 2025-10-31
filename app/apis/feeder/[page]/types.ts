export type ReactionModalReactors = {
  reactionType: string;
  loading: boolean;
  page: boolean;
  error: string;
  totalRows: number;
  totalPages: number;
};

export type ReactionModalHeader = {
  reactionType: string;
  count: number;
};

export type FeedComments = {};

export type FeedCommentReply = {
  user: {
    firstName: string;
    lastName: string;
  };
  reactions: {
    user: {
      firstName: string;
      lastName: string;
    };
  }[];
  replies: {
    user: {
      firstName: string;
      lastName: string;
    };
    reactions: {
      user: {
        firstName: string;
        lastName: string;
      };
    }[];
  }[];
}[];

export type FeedCommentReplyReply = {
  user: {
    firstName: string;
    lastName: string;
  };
  reactions: {
    user: {
      firstName: string;
      lastName: string;
    };
  }[];
}[];
