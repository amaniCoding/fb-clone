import Image from "next/image";
export default function Content({
  content,
  mediaUrl,
}: {
  content: string | null;
  mediaUrl: string | null;
}) {
  return (
    <div>
      {content && <p>{content}</p>}
      {mediaUrl ? (
        <Image
          alt=""
          src={mediaUrl}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-52 object-cover block flex-none"
        />
      ) : null}
    </div>
  );
}
