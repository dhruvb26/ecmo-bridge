"use client";
import {
  ActivityIcon,
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  User2Icon,
  UserRoundPlusIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex min-h-screen flex-auto flex-shrink-0 flex-col bg-primary-purple-200 text-gray-800 antialiased">
      <div
        id="first"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex h-full w-16 flex-col items-center overflow-hidden rounded bg-primary-purple-900 text-washed-purple-300 ${isHovered ? "duration-8000 hidden transition ease-in-out" : "duration-8000 flex transition-all ease-in-out"}`}
      >
        <Link className="mt-3 flex items-center justify-center" href="/">
          <svg
            className="h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        </Link>
        <div className="mt-3 flex flex-col items-center border-t border-gray-700 text-white">
          <Link
            className="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-primary-purple-100"
            href="#"
          >
            <HomeIcon size={24} />
          </Link>
          <Link
            className="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-primary-purple-100"
            href="#"
          >
            <UserRoundPlusIcon size={24} />
          </Link>
          <Link
            className="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-primary-purple-100 "
            href="#"
          >
            <ActivityIcon size={24} />
          </Link>
        </div>
        <div className="mt-2 flex flex-col items-center border-t border-gray-700 text-white">
          <Link
            className="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-primary-purple-100"
            href="#"
          >
            <SettingsIcon size={24} />
          </Link>
          <Link
            className="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-primary-purple-100"
            href="#"
          >
            <User2Icon size={24} />
          </Link>
        </div>
        <Link
          className="mt-auto flex h-16 w-16 items-center justify-center bg-indigo-800 text-white hover:bg-primary-purple-100"
          href="#"
        >
          <LogOutIcon size={24} />
        </Link>
      </div>

      {isHovered && (
        <div
          id="second"
          className={`duration-8000 flex h-full w-40 flex-col items-center overflow-hidden rounded bg-primary-purple-900 text-white transition-all ease-in-out`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            className="mt-3 flex w-full items-center justify-center px-3"
            href="/"
          >
            <svg
              className="h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
          </Link>
          <div className="w-full px-2">
            <div className="mt-3 flex w-full flex-col items-center border-t border-gray-700">
              <Link
                className="mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-primary-purple-100"
                href="/bridge/dashboard"
              >
                <HomeIcon size={24} />
                <span className="ml-2 text-sm font-medium">Dashboard</span>
              </Link>
              <Link
                className="mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-primary-purple-100"
                href="/bridge/patients"
              >
                <UserRoundPlusIcon size={24} />
                <span className="ml-2 text-sm font-medium">Patients</span>
              </Link>
              <Link
                className="mt-2  flex h-12 w-full items-center rounded px-3 hover:bg-primary-purple-100 "
                href="/bridge/machines"
              >
                <ActivityIcon size={24} />
                <span className="ml-2 text-sm font-medium">ECMOs</span>
              </Link>
            </div>
            <div className="mt-2 flex w-full flex-col items-center border-t border-gray-700">
              <Link
                className="mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-primary-purple-100"
                href="/bridge/settings"
              >
                <SettingsIcon size={24} />
                <span className="ml-2 text-sm font-medium">Settings</span>
              </Link>
              <Link
                className="mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-primary-purple-100"
                href="/bridge/profile"
              >
                <User2Icon size={24} />
                <span className="ml-2 text-sm font-medium">Profile</span>
              </Link>
            </div>
          </div>
          <Link
            className="mt-auto flex h-16 w-full items-center justify-center bg-indigo-800 hover:bg-primary-purple-100"
            href="#"
          >
            <LogOutIcon size={24} />
            <span className="ml-2 text-sm font-medium">Logout</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
