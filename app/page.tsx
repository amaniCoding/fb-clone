import NavBar from "./components/home/navbar";
import SideBar from "./components/home/sidebar";
import AddPost from "./components/home/feed/addpost/addpost";
import { Suspense } from "react";
import Stories from "./components/home/feed/story/stories/stories";
import Feeder from "./components/home/feed/feeder/feeder";
import Contacts from "./components/home/contacts";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import Story from "./components/skeletons/story";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div className=" bg-gray-100 min-h-screen w-full">
      <NavBar loggedInUser={session.user} />
      <div className="flex md:pt-[73px] pt-[55px]">
        <SideBar loggedInUser={session.user} />
        <div className="w-[50%] ml-[25%]">
          <AddPost loggedInUser={session.user} />
          <Suspense fallback={<Story />}>
            <Stories loggedInUser={session.user} />
          </Suspense>
          <Feeder />
        </div>
        <Contacts />
      </div>
    </div>
  );
}
