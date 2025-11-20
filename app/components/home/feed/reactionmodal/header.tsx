"use client";

import Header from "@/app/components/skeletons/reactionsModal/header";
import { useFetchHeaderGreactions } from "@/app/store/slices/modal/reaction/hooks/header";
import Greactions from "./greactions";

export default function ModalHeader() {
  const { loading, gReactions, error } = useFetchHeaderGreactions();
  return (
    <div className="sticky top-0 left-0 right-0 py-2">
      {loading && <Header />}
      {gReactions && <Greactions gReactions={gReactions} />}
      {error && <p></p>}
    </div>
  );
}
