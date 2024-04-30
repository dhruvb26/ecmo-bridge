import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { Roboto } from "next/font/google";
import SideNavbar from "./_components/side-navbar";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <SideNavbar />
        <div className="ml-64"> {children}</div>
      </body>
    </html>
  );
}
