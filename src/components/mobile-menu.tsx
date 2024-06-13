"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { PiCaretDoubleRight } from "react-icons/pi";
import { useSidebarContext } from "./sidebar-context";

export default function MobileMenu() {
  const { sidebarOpen, setSidebarOpen } = useSidebarContext();
  return (
    <>
      {/* MENU ICON */}
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        className={cn(
          "sm:hidden",
          "inline-block absolute right-0 bg-primary-600 text-white p-4 z-10"
        )}
      >
        <PiCaretDoubleRight
          className={cn(
            "size-6 transition-transform",
            sidebarOpen && "rotate-180"
          )}
        />
      </button>
      {/* END MENU ICON */}
    </>
  );
}
