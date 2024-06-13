"use client";

import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import {
  PiBellSimple,
  PiCloud,
  PiLock,
  PiMoney,
  PiSignOut,
  PiTag,
  PiUser,
  PiUsers,
} from "react-icons/pi";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import useWindowSize from "@/lib/useWindowSize";
import MobileMenu from "./mobile-menu";
import { useSidebarContext } from "./sidebar-context";

type SidebarLinks = {
  title: string;
  icon: IconType;
  to: string;
};

const sidebarLinks: SidebarLinks[] = [
  {
    title: "Account",
    icon: PiUser,
    to: "#",
  },
  {
    title: "Security",
    icon: PiLock,
    to: "#",
  },
  {
    title: "Notifications",
    icon: PiBellSimple,
    to: "#",
  },
  {
    title: "Pricing",
    icon: PiMoney,
    to: "#",
  },
  {
    title: "Sales",
    icon: PiTag,
    to: "#",
  },
  {
    title: "Users & Roles",
    icon: PiUsers,
    to: "#",
  },
  {
    title: "Backups",
    icon: PiCloud,
    to: "#",
  },
];

export default function Sidebar() {
  const { width } = useWindowSize();
  const { sidebarOpen } = useSidebarContext();

  return (
    <>
      {/* DASHBOARD SIDEBAR */}
      <aside
        className={cn(
          "flex flex-col bg-card text-card-foreground p-2 w-56 h-full max-h-[600px] m-[--sidebar-margins] rounded-lg border transition-transform",
          "max-sm:fixed top-0 max-sm:z-10 max-sm:left-0 max-sm:-translate-x-full max-sm:ml-0",
          sidebarOpen && "max-sm:translate-x-0 max-sm:ml-[--sidebar-margins]"
        )}
      >
        <div className="text-neutral-700 font-bold text-xs px-2">Settings</div>

        <ul className="mt-2 border-b pb-3">
          {sidebarLinks.map(({ icon: Icon, title, to }) => (
            <li key={title}>
              <Link
                href={to}
                className="flex items-center text-sm px-4 py-3 gap-x-2 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Icon />
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto mx-auto pb-4">
          <Button variant={"outline"} className="space-x-3">
            <PiSignOut />
            <span>Back to Dashboard</span>
          </Button>
        </div>
      </aside>
      {/* END DASHBOARD SIDEBAR */}

      {/* SIDEBAR OVERLAY */}
      <div
        className={cn(
          "fixed hidden inset-0 bg-[#344054]/60 z-[9]",
          sidebarOpen && "max-sm:block"
        )}
      ></div>
      {/* END SIDEBAR OVERLAY */}
    </>
  );
}
