"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useClickAway } from "@uidotdev/usehooks";

export function UserDropdown() {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const dropDownClasses = clsx({
    hidden: !isDropdownOpened,
    "absolute top-8 right-0": true,
  });

  const toggleDropdown = () => {
    setIsDropdownOpened(true);
  };

  const dropDownRef = useClickAway<HTMLDivElement>((e) => {
  if ((e.target as HTMLElement).closest(".user-name-button")) {
    return;
  }
  setIsDropdownOpened(false);
});

  return (
    <div
      className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
      style={{ position: "relative" }}
    >
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>

        <Image
          src="/assets/IvanSlivenko.jpg" // або інший шлях, відносно папки public/
          alt="User icon"
          width={50}
          height={50}
          className="w-11 h-11 rounded-full"
          // style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      </button>

      {/* Dropdown menu */}
      <div
        // className= {` z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600  ${dropDownClasses}`}
        className={twMerge(
          "z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600",
          dropDownClasses
        )}
        style={{ position: "absolute", top: "35px" }}
        id="user-dropdown"
        ref={dropDownRef}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
            name@flowbite.com
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>

      {/* <button
        data-collapse-toggle="navbar-user"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-user"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button> */}
    </div>
  );
}
