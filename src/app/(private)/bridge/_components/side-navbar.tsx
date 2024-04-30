import React from "react";
import { Button } from "~/components/ui/button";
import {
  DashboardIcon,
  AvatarIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import {
  RiUser2Fill,
  RiUser3Fill,
  RiDashboardHorizontalLine,
  RiUser4Fill,
  RiUser4Line,
} from "@remixicon/react";
import { NavButton } from "./nav-button";
const SideNavbar = () => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-40 flex-col items-center gap-2 overflow-y-auto border-r-[0.5px] border-gray-300 bg-white p-4">
      <Image width={25} height={25} src="/favicon.ico" alt="Logo" />
      <NavButton variant={"ghost"} className="w-full">
        <Link href={"/bridge/dashboard"}>Dashboard</Link>
      </NavButton>
      <NavButton variant={"ghost"} className="w-full">
        <Link href={"/bridge/onboarding"}>Onboarding</Link>
      </NavButton>
      <NavButton variant={"ghost"} className="w-full">
        <Link href={"/bridge/patients"}>Patients</Link>
      </NavButton>
      <NavButton variant={"ghost"} className="w-full">
        <Link href={"/bridge/machines"}>ECMOS</Link>
      </NavButton>
    </div>
  );
};

export default SideNavbar;
