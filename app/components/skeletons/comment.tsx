export default function CommentsSkeleton() {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="w-[55%] h-24 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="w-[55%] h-7 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="w-[55%] h-24 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}
