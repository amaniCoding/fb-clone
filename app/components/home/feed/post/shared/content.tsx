"use client";
export default function Content({
  content,
}: {
  content: string | undefined | null;
}) {
  return (
    <div>
      <p className=" px-3.5 my-2">{content}</p>
    </div>
  );
}
