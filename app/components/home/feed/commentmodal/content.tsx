"use client";
export default function Content({ content }: { content: string | null }) {
  return <p className="px-3">{content}</p>;
}
