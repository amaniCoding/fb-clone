import Image from "next/image";
export default function BirthDays() {
  return (
    <div>
      <p>BirthDays</p>
      <div className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-200">
        <Image
          alt="Amanuel Ferede"
          src="/sidebar/gift.png"
          width={0}
          height={0}
          sizes="100vh"
          className="w-7 h-7"
        />
        <p className="text-sm">Amanuel Feredes birthdate is today</p>
      </div>
    </div>
  );
}
