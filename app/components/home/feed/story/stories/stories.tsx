import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoggedInUser } from "./types";
import StoriesClient from "./_stories";
import { stories } from "@/app/seed/dummy";

export default async function Stories({
  loggedInUser: { profilePicture },
}: {
  loggedInUser: LoggedInUser;
}) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const _stories = stories;
  return (
    <StoriesClient
      loggedInUserProfilePicture={profilePicture}
      stories={_stories}
    />
  );
}
