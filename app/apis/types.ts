export type Reactor = {
  reactionType: string;
  loading: boolean;
  page: boolean;
  error: string;
  totalRows: number;
  totalPages: number;
};

export type GReaction = {
  reactionType: string;
  count: number;
};
