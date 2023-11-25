import {DropdownMenu} from "@radix-ui/themes";
import React from "react";
import {useProductContext} from "../../Contexts/ProductContext";
import {useFilterContext} from "../../Contexts/FilterContext";
import { useNavigate } from "react-router-dom";

export default function NavDropDown({navItem}) {
  const {products} = useProductContext();
  const {hendleCtegory} = useFilterContext();
  const navigate=useNavigate()
  const getUniqueData = (data, property) => {
    let c = [];
    data.map((item) => {
      item.category.map((i) => {
        return c.push(i);
      });
    });

    c = ["All", ...new Set(c)];
    return c;
  };

  const categoryData = getUniqueData(products, "category");
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>{navItem}</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {categoryData.map((c) => (
            <DropdownMenu.Item
              onClick={() => {
                hendleCtegory(c)
                navigate("/products")
              }}
            >
              {c}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
