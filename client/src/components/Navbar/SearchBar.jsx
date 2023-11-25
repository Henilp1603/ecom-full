import { TextField } from "@radix-ui/themes";
import { SearchIcon } from "lucide-react";
import React from "react";

export default function SearchBar() {
  return (
    <TextField.Root variant="soft" className="w-80">
      <TextField.Slot>
        <SearchIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder="Search the products" />
    </TextField.Root>
  );
}
