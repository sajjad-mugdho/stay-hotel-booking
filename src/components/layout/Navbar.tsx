"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import React from "react";
import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import SearchInput from "../SearchInput";
import { ModeToggle } from "../Theme/themeToggole";
import { NavManu } from "../NavManu";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="sticky  top-0 border border-b-primary/10 bg-secondary">
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-1 cursor-pointer">
              <Image src="/logo.svg" alt="Stay Hotel" width={50} height={30} />
              <div className="font-bold text-xl ">StayHotel</div>
            </div>
          </Link>
          <SearchInput />
          <div className="flex gap-3 items-center">
            <div className=" flex gap-2 items-center">
              <NavManu />
              <ModeToggle />
            </div>

            {userId ? (
              <>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    size="sm"
                    // onClick={() => router.push("/sign-in")}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    // onClick={() => router.push("/sign-up")}
                    variant="outline"
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
