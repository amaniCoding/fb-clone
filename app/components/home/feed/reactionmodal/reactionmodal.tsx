"use client";
import { useAppDispatch } from "@/app/store/hooks";
import ModalHeader from "./header";
import ModalBody from "./body";
import { showReactionModal } from "@/app/store/slices/modal/reaction";

export default function ReactionModal() {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(
      showReactionModal({
        currentReactionType: undefined,
        isOpen: false,
        currentPost: {},
      })
    );
  };

  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-300 overflow-hidden">
      <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl bg-white my-10 relative">
        <div className="max-h-120 overflow-y-auto">
          <ModalHeader onClose={closeModal} />
          <ModalBody />
        </div>
      </div>
    </div>
  );
}
