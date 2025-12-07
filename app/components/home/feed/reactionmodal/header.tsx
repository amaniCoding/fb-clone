"use client";

import Header from "@/app/components/skeletons/reactionsModal/header";
import Greactions from "./greactions";
import { FaXmark } from "react-icons/fa6";
import useSWR from "swr";
import { GReactionsType } from "@/app/api/reactions/header/[refId]/post/lib";

export default function ModalHeader({ onClose }: { onClose: () => void }) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR<GReactionsType>(
    "/api/user",
    fetcher
  );
  if (error) return <div>Failed to load posts</div>;
  if (isLoading) return <Header />;
  return (
    <div className="sticky top-0 left-0 right-0 py-2">
      <div className="flex items-center justify-between">
        <Greactions gReactions={data} />

        <FaXmark
          className="w-10 h-10 rounded-full hover:bg-slate-300 p-2 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
