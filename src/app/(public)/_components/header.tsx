"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "~/components/ui/navigation-menu";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
} from "~/components/ui/drawer";
import Link from "next/link";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { MagicButton } from "~/components/ui/magic-button";

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div className="flex-shrink-0">
            <a href="/" title="home" className="flex">
              <img
                className="h-8 w-auto"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/logo.svg"
                alt=""
              />
            </a>
          </div>

          <div className="ml-auto flex items-center justify-end space-x-6">
            <SignedOut>
              <Button
                variant={"outline"}
                className="border-washed-purple-400 text-primary-purple-500 border-2 bg-white transition-all duration-200 hover:bg-slate-200 hover:text-primary-purple-primary-purple-800 hover:text-opacity-80 lg:inline-flex"
              >
                <SignInButton></SignInButton>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                variant={"outline"}
                className="border-washed-purple-400 text-primary-purple-500 hidden  border-2 bg-white transition-all duration-200  hover:bg-slate-200 hover:text-primary-purple-primary-purple-800 hover:text-opacity-80 lg:inline-flex"
              >
                Dashboard
              </Button>
              <UserButton></UserButton>
            </SignedIn>
          </div>

          {/* <Button
            variant={"ghost"}
            className="hover:bg-primary-purple-800 text-white hover:text-white"
          >
            <HamburgerMenuIcon />
          </Button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
