"use client";
import { useAppDispatch } from "@/app/store/hooks";
import { showCommentModal } from "@/app/store/slices/modal/comment";
import { FaXmark } from "react-icons/fa6";
import ModalHeader from "./header";
import ModalBody from "./body";

export default function ReactionModal() {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(
      showCommentModal({
        isOpen: false,
      })
    );
  };

  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl bg-white my-10 relative">
        <FaXmark
          className="w-10 h-10 p-2 hover:bg-gray-50 bg-gray-100 rounded-full cursor-pointer"
          onClick={() => {
            closeModal;
          }}
        />
        <ModalHeader />
        <ModalBody />
      </div>
    </div>
  );
}
