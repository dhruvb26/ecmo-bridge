import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/main-navbar";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { cn } from "~/lib/utils";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata = {
  title: "ECMO Bridge",
  description: "Bridge the gap between ECMO patients and machines.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            roboto.className,
          )}
        >
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
