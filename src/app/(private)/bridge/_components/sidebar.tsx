import React from "react";
import {
  DashboardIcon,
  AvatarIcon,
  ActivityLogIcon,
  HeartIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { NavButton } from "./nav-button";
import { api } from "~/trpc/server";

const Sidebar = async () => {
  const hospital = await api.hospital.get();
  const isVerified = hospital?.isVerified;
  return (
    <>
      {/* Large screens (>=768px or "md" breakpoint in Tailwind) */}
      <div className="hidden min-h-screen min-w-[200px] flex-col items-center border-r-[0.5px] border-gray-300 bg-white p-4 md:flex md:w-[200px]">
        <Image width={25} height={25} src="/favicon.ico" alt="Logo" />
        <NavButton
          icon={<DashboardIcon />}
          variant={"ghost"}
          className="w-full text-left"
        >
          <Link href={"/bridge/dashboard"}>Dashboard</Link>
        </NavButton>
        <NavButton
          icon={<ActivityLogIcon />}
          variant={"ghost"}
          className="w-full"
        >
          <Link href={"/bridge/onboarding"}>Onboarding</Link>
        </NavButton>

        {isVerified && (
          <>
            <NavButton
              icon={<AvatarIcon />}
              variant={"ghost"}
              className="w-full text-left"
            >
              <Link href={"/bridge/patients"}>Patients</Link>
            </NavButton>
            <NavButton
              icon={<HeartIcon />}
              variant={"ghost"}
              className="w-full"
            >
              <Link href={"/bridge/machines"}>ECMOS</Link>
            </NavButton>
          </>
        )}
        <NavButton icon={<GearIcon />} variant={"ghost"} className="w-full">
          <Link href={"/bridge/profile"}>Settings</Link>
        </NavButton>
      </div>

      {/* Smaller screens (<768px or "md" breakpoint in Tailwind) */}
      <div className="flex min-h-screen min-w-[50px] flex-col items-center border-r-[0.5px] border-gray-300 bg-white p-2 md:hidden">
        <Image width={25} height={25} src="/favicon.ico" alt="Logo" />
        <NavButton variant={"ghost"} className="w-full items-center">
          <Link href={"/bridge/dashboard"} className="items-center">
            <DashboardIcon />
          </Link>
        </NavButton>
        <NavButton variant={"ghost"} className="w-full">
          <Link href={"/bridge/onboarding"}>
            <ActivityLogIcon />
          </Link>
        </NavButton>

        {isVerified && (
          <>
            <NavButton variant={"ghost"} className="w-full text-left">
              <Link href={"/bridge/patients"}>
                <AvatarIcon />
              </Link>
            </NavButton>
            <NavButton variant={"ghost"} className="w-full">
              <Link href={"/bridge/machines"}>
                <HeartIcon />
              </Link>
            </NavButton>
          </>
        )}
        <NavButton variant={"ghost"} className="w-full">
          <Link href={"/bridge/profile"}>
            <GearIcon />
          </Link>
        </NavButton>
      </div>
    </>
  );
};

export default Sidebar;
