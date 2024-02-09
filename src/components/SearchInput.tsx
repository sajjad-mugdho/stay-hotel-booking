import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

type Props = {};

const SearchInput = (props: Props) => {
  return (
    <div className="relative sm:block hidden">
      <Search className="absolute w-4 h-4 top-3 left-4 text-muted-foreground" />
      <Input placeholder="Search" className="pl-10 bg-primary/10" />
    </div>
  );
};

export default SearchInput;
