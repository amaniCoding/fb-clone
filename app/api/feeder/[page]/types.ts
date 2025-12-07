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
