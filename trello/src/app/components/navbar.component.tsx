// import Image from "next/image";
import Link from "next/link";
import { UserDropdown } from ".";
import { ExampleMenu } from "./Exemple-menu.components";

export function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800 mb-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/IvanSlivenko.jpg"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            alt="UmanProger Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            UmanProger
          </span>
        </Link>
        {/* <ExampleMenu/> */}
        <UserDropdown />
      </div>
    </nav>
  );
}
