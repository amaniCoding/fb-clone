import BirthDays from "./birthdays";
import ContactList from "./contactlist";
import Search from "./search";

export default function Contacts() {
  return (
    <div
      className={`xl:w-[30%] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-full xl:pl-32 xl:block hidden fixed right-0 bottom-0 top-0 h-screen pt-20 overflow-y-auto
  [&::-webkit-scrollbar]:w-0"
  `}
    >
      <BirthDays />
      <Search />
      <ContactList />
    </div>
  );
}
