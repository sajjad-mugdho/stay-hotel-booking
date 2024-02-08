import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
