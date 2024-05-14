import "~/styles/globals.css";
import Sidebar from "./_components/sidebar";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "~/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <body
            className={`${GeistSans.className} flex justify-between antialiased`}
          >
            <TRPCReactProvider>
              <Sidebar />
              <main className="h-full w-full">{children}</main>
              <Toaster />
              <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB6p47Gmzx-LGcoMCBjISxYqi42871sznA&libraries=places"></script>
            </TRPCReactProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
