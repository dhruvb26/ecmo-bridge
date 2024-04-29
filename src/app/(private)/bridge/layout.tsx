import { Inter } from "next/font/google";
import "~/styles/globals.css";
import SideNavbar from "./_components/side-navbar";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SideNavbar />
        <div className="ml-64"> {children}</div>
      </body>
    </html>
  );
}
