import {TextField} from "@radix-ui/themes";
import {SearchIcon} from "lucide-react";
import React from "react";
import {useFilterContext} from "../../Contexts/FilterContext";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {
  const {filters, upadteFilterValue} = useFilterContext();
  const navigate = useNavigate();

  return (
    <TextField.Root variant="soft" className="w-80">
      <TextField.Slot>
        <SearchIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input
        placeholder="Search the products"
        name="text"
        value={filters.text}
        onChange={(e) => {
          upadteFilterValue(e);
          navigate("/products");
        }}
      />
    </TextField.Root>
  );
}
