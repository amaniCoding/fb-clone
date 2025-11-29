"use client";

import Body from "@/app/components/skeletons/reactionsModal/body";
import Reactors from "./reactors";
import { useFetchReactors } from "@/app/hooks/reactionModal/usefetchreactors";
import { useLastReactorNodeRef } from "@/app/hooks/reactionModal/uselastnoderef";

export default function ModalBody() {
  const { loading, reactors, error, page, totalPages } = useFetchReactors();
  const hasMore = page! <= totalPages!;
  const lastNodeRef = useLastReactorNodeRef(hasMore, loading!, page!);
  return (
    <div className="sticky top-0 left-0 right-0 py-2">
      {loading && <Body />}
      {reactors && <Reactors lastNodeRef={lastNodeRef} reactors={reactors} />}
      {error && <p></p>}
    </div>
  );
}
