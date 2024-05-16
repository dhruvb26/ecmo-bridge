import Link from "next/link";
import { Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6">
      <nav className="hidden flex-col text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/bridge/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/bridge/patients"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Patients
        </Link>
        <Link
          href="/bridge/machines"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          ECMO
        </Link>

        <Link
          href="/contact"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Contact
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <UserButton />
      </div>
    </header>
  );
};
export { Header };
