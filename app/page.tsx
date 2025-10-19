import { redirect } from "next/navigation";
import Contacts from "./components/home/contacts";
import NavBar from "./components/home/navbar";
import SideBar from "./components/home/sidebar";
import { auth } from "@/app/libs/auth/auth";
import AddPost from "./components/home/feed/addpost/addpost";
import { Suspense } from "react";
import Story from "./components/skeletons/story";
import Stories from "./components/home/feed/story/stories/stories";
import Feeder from "./components/home/feed/feeder/feeder";
export default async function Home() {
  const session = await auth();

  if (!session) redirect("/login");
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar loggedInUser={session.user} />
      <div className="flex md:pt-[73px] pt-[55px]">
        <SideBar loggedInUser={session.user} />
        <div className="w-[37%] ml-[30%] ">
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
