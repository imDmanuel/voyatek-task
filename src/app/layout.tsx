import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import SidebarContextProvider from "@/components/sidebar-context";
import MobileMenu from "@/components/mobile-menu";

const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/satoshi/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    // {
    //   path: "../assets/fonts/Satoshi-Regular.otf",
    //   weight: "700",
    //   style: "italic",
    // },
  ],
});

export const metadata: Metadata = {
  title: "User Settings UI",
  description: "Voyatek Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarContextProvider>
      <html lang="en">
        <body className={`${satoshi.className} h-dvh antialiased`}>
          <Navbar />

          <div className="flex h-[calc(100%_-_var(--navbar-height)_-_2_*_var(--sidebar-margins))]">
            <Sidebar />

            {children}
            <MobileMenu />
          </div>
          <Toaster />
        </body>
      </html>
    </SidebarContextProvider>
  );
}
