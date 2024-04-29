import React from "react";
import { Button } from "~/components/ui/button";
import {
  DashboardIcon,
  AvatarIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
const SideNavbar = () => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-40 flex-col items-start gap-2 overflow-y-auto border-r-[0.5px] border-gray-300 bg-white p-4">
      <Image width={25} height={25} src="/favicon.ico" alt="Logo" />
      <Button variant={"ghost"} className="flex w-full items-start gap-2">
        <div className="flex w-6 justify-start">
          <DashboardIcon />
        </div>
        <Link href={"/bridge/dashboard"}>
          <span>Dashboard</span>
        </Link>
      </Button>

      <Button variant={"ghost"} className="flex w-full items-start gap-2">
        <div className="flex w-6 justify-start">
          <AvatarIcon />
        </div>
        <Link href={"/bridge/onboarding"}>
          <span>Onboarding</span>
        </Link>
      </Button>

      <Button variant={"ghost"} className="flex w-full items-start gap-2">
        <div className="flex w-6 justify-start">
          <ActivityLogIcon />
        </div>
        <span>Actions</span>
      </Button>
    </div>
  );
};

export default SideNavbar;
