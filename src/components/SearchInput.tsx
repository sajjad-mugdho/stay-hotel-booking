import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";

type Props = {};

const SearchInput = (props: Props) => {
  const searchParam = useSearchParams();
  const title = searchParam.get("title");

  const [value, setValue] = useState(title || "");

  const pathname = usePathname();
  const router = useRouter();

  const debouncedValue = useDebounce<string>(value);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  console.log(debouncedValue);

  if (pathname !== "/") return null;

  return (
    <div className="relative sm:block hidden">
      <Search className="absolute w-4 h-4 top-3 left-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Search"
        className="pl-10 bg-primary/10"
      />
    </div>
  );
};

export default SearchInput;
