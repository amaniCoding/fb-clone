"use client";

import Header from "@/app/components/skeletons/reactionsModal/header";
import { useFetchHeaderGreactions } from "@/app/store/slices/modal/reaction/hooks/header";
import Greactions from "./greactions";
import { FaXmark } from "react-icons/fa6";

export default function ModalHeader({ onClose }: { onClose: () => void }) {
  const { loading, gReactions, error } = useFetchHeaderGreactions();
  return (
    <div className="sticky top-0 left-0 right-0 py-2">
      <div className="flex items-center justify-between">
        <div>
          {loading! && <Header />}
          {gReactions && <Greactions gReactions={gReactions} />}
          {error && <p></p>}
        </div>
        <FaXmark
          className="w-10 h-10 rounded-full hover:bg-slate-300 p-2 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
