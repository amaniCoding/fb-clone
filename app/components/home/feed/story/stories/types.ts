export type LoggedInUser = {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

export type StorySliderItem = {
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
  post: string;
};

export type StorySliderProps = {
  storyid: number;
  fname: string;
  lname: string;
  profilepic: string;
  post: string;
};
