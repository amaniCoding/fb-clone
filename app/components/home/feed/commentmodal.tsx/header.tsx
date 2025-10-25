"use client";

import { FaXmark } from "react-icons/fa6";

export default function Header({
  poster,
  onClose,
}: {
  poster: string;
  onClose: () => void;
}) {
  return (
    <div className="shadow-sm flex rounded-t-xl items-center justify-between mb-2 border-b-2 border-b-slate-200 p-2 sticky w-full left-0 right-0 bg-white top-0">
      <p></p>
      <p className="font-semibold text-xl">{poster}&apos;s Post</p>
      <FaXmark
        className="w-10 h-10 rounded-full hover:bg-slate-300 p-2 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}
