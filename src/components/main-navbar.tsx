"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { Avatar } from "./ui/avatar";
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
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Define the menu content to reuse in both mobile and desktop layouts
  const MenuContent = () => (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col space-y-2   md:flex-row md:items-center md:space-x-2 md:space-y-0 md:bg-transparent">
        <NavigationMenuItem asChild>
          <Button variant={"link"} className="text-white md:text-secondary">
            <Link href="/">Home</Link>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <Button variant={"link"} className="text-white md:text-secondary">
            <Link href="/about">About</Link>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <Button variant={"link"} className="text-white md:text-secondary">
            <Link href="/contact">Contact</Link>
          </Button>
        </NavigationMenuItem>
        <SignedIn>
          <NavigationMenuItem asChild>
            <Button variant={"link"} className="text-white md:text-secondary">
              <Link href="/bridge/dashboard">Dashboard</Link>
            </Button>
          </NavigationMenuItem>
        </SignedIn>
        <NavigationMenuItem>
          <SignedOut>
            <Button variant={"link"}>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <Avatar>
              <UserButton />
            </Avatar>
          </SignedIn>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full">
      <div className="mx-auto flex flex-row justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex">
              {/* <Image
                height={32}
                width={32}
                className="h-8 w-auto"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/logo.svg"
                alt=""
              /> */}
              <span className="text-2xl font-bold text-white">ECMO Bridge</span>
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center justify-end space-x-6 md:hidden">
          <Button
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            {drawerOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </Button>
        </div>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <DrawerDescription className="flex flex-row justify-end p-4">
              <DrawerClose onClick={() => setDrawerOpen(false)}>
                <Button variant={"secondary"}>
                  <Cross1Icon />
                </Button>
              </DrawerClose>
            </DrawerDescription>
            <DrawerHeader className="flex h-full flex-row items-center justify-center">
              {MenuContent()}
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
        <div className="hidden md:flex md:flex-row md:items-center md:bg-transparent">
          {MenuContent()}
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;
