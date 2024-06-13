"use client";

import React, { useState } from "react";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { Input } from "./ui/input";
import {
  PiBellSimple,
  PiCaretDown,
  PiGearDuotone,
  PiList,
  PiMagnifyingGlass,
  PiQuestion,
  PiWallet,
} from "react-icons/pi";
import ProfileImage from "@/assets/images/avatar-2.png";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="relative bg-white border-b px-6 md:px-9 py-5 flex items-center gap-x-2 md:gap-x-6">
      {/* LOGO */}
      <div className="size-10 md:size-12 grid place-items-center p-[7px] bg-[#0A6DE4] rounded shrink-0">
        <Image src={Logo} alt="Go Icon Logo" />
      </div>
      {/* END LOGO */}

      {/* SEARCH BAR */}
      <div className="flex items-center bg-background rounded-lg h-10 py-2 px-4 w-[450px] lg:w-[629px]">
        <PiMagnifyingGlass className="text-[#475367]" />
        <Input
          className="border-none text-[#667185] focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search here..."
        />
      </div>
      {/* END SEARCH BAR */}

      {/* ICONS MOBILE TOGGLE */}
      <button
        className={cn("border rounded-lg ml-auto", "lg:hidden")}
        onClick={() => setDropdownOpen((v) => !v)}
      >
        <PiList className="size-10" />
      </button>
      {/* END ICONS MOBILE TOGGLE */}

      {/* TODO: IMPLEMENT MOBILE VIEW OF AVATAR IMAGE */}
      <div
        className={cn(
          "hidden lg:flex lg:gap-x-2 lg:items-center ml-auto",
          dropdownOpen &&
            "absolute right-0 bottom-0 flex flex-col w-60 translate-y-full bg-white z-10 shadow-lg border"
        )}
      >
        {/* NAVBAR ACTION ICONS */}
        <div className="flex flex-col items-center px-2 gap-y-1 [&>*]:hover:text-primary-600 hover:cursor-pointer max-lg:flex-row max-lg:gap-x-2 max-lg:py-4 max-lg:border-b max-lg:mx-2 max-lg:hover:bg-primary-50 ">
          <PiBellSimple className="text-[#667185] size-6" />
          <div className="text-xs text-[#647995]">Notifications</div>
        </div>
        <div className="flex flex-col items-center px-2 gap-y-1 [&>*]:hover:text-primary-600 hover:cursor-pointer max-lg:flex-row max-lg:gap-x-2 max-lg:py-4 max-lg:border-b max-lg:mx-2 max-lg:hover:bg-primary-50 ">
          <PiWallet className="text-[#667185] size-6" />
          <div className="text-xs text-[#647995]">Wallet</div>
        </div>
        <div className="flex flex-col items-center px-2 gap-y-1 [&>*]:hover:text-primary-600 hover:cursor-pointer max-lg:flex-row max-lg:gap-x-2 max-lg:py-4 max-lg:border-b max-lg:mx-2 max-lg:hover:bg-primary-50 ">
          <PiQuestion className="text-[#667185] size-6" />
          <div className="text-xs text-[#647995]">Inquiries</div>
        </div>
        <div className="flex flex-col items-center px-2 gap-y-1 [&>*]:hover:text-primary-600 hover:cursor-pointer max-lg:flex-row max-lg:gap-x-2 max-lg:py-4 max-lg:border-b max-lg:mx-2 max-lg:hover:bg-primary-50 ">
          <PiGearDuotone className="text-[#667185] size-6" />
          <div className="text-xs text-[#647995]">Settings</div>
        </div>
        {/* END NAVBAR ACTION ICONS */}

        {/* USER PROFILE AVATAR */}
        <div className="flex items-center gap-x-3 max-lg:hidden">
          <Image
            src={ProfileImage}
            alt=""
            className="size-10 rounded-full shrink-0"
          />

          <PiCaretDown className="shrink-0" />
        </div>
        {/* END USER PROFILE AVATAR */}
      </div>
    </nav>
  );
}
