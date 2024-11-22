"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpenCheck, ChevronsUpDown, Hotel, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function NavManu() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ChevronsUpDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/add-hotel">
          <DropdownMenuItem
            className="cursor-pointer flex gap-2 items-center"
            // onClick={() => router.push("/add-hotel")}
          >
            <Plus size={15} /> <span>Add Hotel</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/my-hotels">
          <DropdownMenuItem
            className="cursor-pointer flex gap-2 items-center"
            // onClick={() => router.push("/my-hotels")}
          >
            <Hotel size={15} /> <span>My Hotels</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/my-bookings">
          <DropdownMenuItem
            className="cursor-pointer flex gap-2 items-center"
            // onClick={() => router.push("/my-bookings")}
          >
            <BookOpenCheck size={15} /> <span>My Bookings</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
