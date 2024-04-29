import { Button } from "~/components/ui/button";
import FAQ from "./_components/faq";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow flex-col items-center justify-center space-y-10">
        <div className="text-box flex flex-col items-center gap-4 text-center">
          <h1 className="text-6xl font-bold">ECMO Bridge</h1>
          <p className="text-lg font-light text-gray-500">
            Get started right away.
          </p>
        </div>
        <div className="button-box flex flex-row items-center justify-center gap-2 p-2">
          <Button className="shadow-lg">Get Started</Button>
          <Button variant={"secondary"} className="shadow-lg">
            <Link href={"/about"}>Learn More</Link>
          </Button>
        </div>
        <FAQ />
      </div>
    </div>
  );
}
