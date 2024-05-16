"use client";
import {
  ActivityIcon,
  DatabaseIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex min-h-screen flex-auto flex-shrink-0 flex-col bg-primary-purple-900 text-gray-800 antialiased">
      <div
        className={`flex h-full w-16 flex-col items-center overflow-hidden rounded bg-primary-purple-900 text-washed-purple-300 transition-all duration-500 ease-in-out ${isHovered ? "hidden" : "flex"}`}
      >
        <Link
          className="mt-3 flex w-full items-center justify-center px-3"
          href="/"
        >
          {/* <Image alt="" src="/favicon.ico" height={32} width={32} /> */}
          <h1 className="text-2xl font-bold text-white">EB</h1>
        </Link>
        <div className="mt-3 flex flex-col items-center border-t border-gray-700 text-white">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="mt-2 flex h-8 w-12 items-center justify-center "
                  href="/"
                >
                  <HomeIcon size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="mt-2 flex h-8 w-12 items-center justify-center "
                  href="/bridge/dashboard"
                >
                  <LayoutDashboardIcon size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="mt-2 flex h-8 w-12 items-center justify-center "
                  href="/bridge/patients-and-ecmos"
                >
                  <DatabaseIcon size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Patients & ECMOs</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="mt-2 flex h-8 w-12 items-center justify-center "
                  href="/bridge/match-list"
                >
                  <ActivityIcon size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Match List</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-2 flex flex-col items-center border-t border-gray-700 text-white">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="mt-2 flex h-8 w-12 items-center justify-center "
                  href="/bridge/settings"
                >
                  <SettingsIcon size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-auto flex h-16 w-full items-center justify-center space-x-2 ">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
