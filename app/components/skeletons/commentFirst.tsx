export default function CommentFirstTimeSkeleton() {
  return (
    <>
      <div className="flex items-center justify-center space-x-10">
        <div className="h-1.5 w-10 bg-gray-200 animate-pulse"></div>
        <div className="h-1.5 w-10 bg-gray-200 animate-pulse"></div>
        <div className="h-1.5 w-10 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-[70%] h-16 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-[50%] h-16 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-full h-7 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
