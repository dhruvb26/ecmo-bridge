"use client";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SignedIn } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-t from-primary-purple-900 via-primary-purple-500 to-primary-purple-300">
      <div className="relative mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-block rounded-full bg-primary-purple-900 p-2 text-white shadow transition hover:bg-primary-purple-600 sm:p-3 lg:p-4"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-white lg:justify-start">
              <Link href="/">
                <h1 className="text-4xl font-bold">ECMO Bridge</h1>
              </Link>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white lg:text-left">
              Bridge the gap between ECMO patients and machines.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 text-white md:gap-8 lg:mt-0 lg:justify-end">
            <li>
              <Button variant={"link"} className="text-white">
                <Link href="/about">About</Link>
              </Button>
            </li>

            <li>
              <Button variant={"link"} className="text-white">
                <Link href="/contact">Contact</Link>
              </Button>
            </li>

            <SignedIn>
              <li>
                <Button variant={"link"} className=" text-white">
                  <Link href="/bridge/dashboard">Dashboard</Link>
                </Button>
              </li>
            </SignedIn>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-white lg:text-right">
          Copyright &copy; 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
