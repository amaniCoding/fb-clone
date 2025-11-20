"use client";

import Body from "@/app/components/skeletons/reactionsModal/body";
import Reactors from "./reactors";
import { useFetchReactors } from "@/app/store/slices/modal/reaction/hooks/body";

export default function ModalBody() {
  const { loading, reactors, error } = useFetchReactors();
  return (
    <div className="sticky top-0 left-0 right-0 py-2">
      {loading && <Body />}
      {reactors && <Reactors reactors={reactors} />}
      {error && <p></p>}
    </div>
  );
}
