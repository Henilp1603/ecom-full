import React from "react";
import {Button, Dialog} from "@radix-ui/themes";
import {ShoppingCart} from "lucide-react";
import {Link} from "react-router-dom";
import {useCartContext} from "../../Contexts/CartContext";

const Cartbtn = () => {
  const {total_item} = useCartContext();
  return (
    <Link to="/cart">
      {" "}
      <Button size="2" className="relative">
        <ShoppingCart width={16} height={16} />
        Cart
        {total_item !== 0 && (
          <div className="absolute p-1 bg-red-600 rounded-full -top-[5px] -right-[6px] h-5 w-5 flex items-center justify-center">
            <span>{total_item}</span>
          </div>
        )}
      </Button>
    </Link>
  );
};

export default Cartbtn;
