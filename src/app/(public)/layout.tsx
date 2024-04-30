import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/ui/theme-provider";
import Navbar from "~/components/main-navbar";
import { cn } from "~/lib/utils";
import { Roboto } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
            "min-h-screen bg-background font-sans antialiased",
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
