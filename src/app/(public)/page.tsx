import { BackgroundBeams } from "~/components/ui/background-beams";
import FAQ from "./_components/faq";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";
import { UsersIcon } from "lucide-react";
import { CheckSquare } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { LockIcon } from "lucide-react";
import Navbar from "~/components/main-navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-b from-primary-purple-900 via-primary-purple-500 to-primary-purple-300">
        <section className="relative min-h-screen pb-10 pt-24 sm:pb-16 sm:pt-32 lg:pb-24">
          {/* <div className="absolute inset-x-0 bottom-0 z-10 hidden lg:flex">
            <img
              className="hidden w-full lg:block"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards.png"
              alt=""
            />
            <img
              className="block w-full lg:hidden"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards-mobile.png"
              alt=""
            />
          </div> */}

          <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-4xl font-bold sm:text-6xl">
                <span className="text-white">
                  Simplified patient-machine matching for healthcare
                </span>
              </h1>
              <p className="mt-5 text-base text-white sm:text-xl">
                Streamline your healthcare practice with our data driven
                patient-machine matching platform.
              </p>
              <SignedOut>
                <button className="mt-8 inline-flex items-center rounded-lg bg-washed-purple-800 p-12 px-6 py-4 font-semibold text-white transition-all duration-200 hover:bg-washed-purple-400 focus:bg-washed-purple-800 sm:mt-16">
                  <SignInButton>Get Started</SignInButton>

                  <ArrowRightCircle className="ml-4" size={24} />
                </button>
              </SignedOut>
              <SignedIn>
                <button className="mt-8 inline-flex items-center rounded-lg bg-washed-purple-800 p-12 px-6 py-4 font-semibold text-white transition-all duration-200 hover:bg-washed-purple-400 focus:bg-washed-purple-800 sm:mt-16">
                  <Link href="">Learn More</Link>

                  <ArrowRightCircle className="ml-4" size={24} />
                </button>
              </SignedIn>

              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-8 px-20 text-left sm:grid-cols-3 sm:px-0">
                <div className="flex items-center">
                  <UsersIcon className="text-white" />
                  <p className="ml-3 text-sm text-white">
                    Developed by students @ ASU
                  </p>
                </div>

                <div className="flex items-center">
                  <CheckSquare className="text-white" />
                  <p className="ml-3 text-sm text-white">
                    No charges. No hidden fees
                  </p>
                </div>

                <div className="flex items-center">
                  <LockIcon className="text-white" />
                  <p className="ml-3 text-sm text-white">
                    Secured & safe database
                  </p>
                </div>
              </div>
            </div>
          </div>
          <FAQ />
        </section>
        <BackgroundBeams />
      </div>
    </>
  );
}
