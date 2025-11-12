export type Reactor = {
  reactionType: string;
  loading: boolean;
  page: number;
  error: string;
  totalRows: number;
  totalPages: number;
};

export type GReaction = {
  reactionType: string;
  count: number;
};
