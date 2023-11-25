import {Button} from "@radix-ui/themes";
import {Badge, CrossIcon, X} from "lucide-react";
import React from "react";
import {useCartContext} from "../../Contexts/CartContext";

export default function CartProduct({item}) {
  const {removeItem} = useCartContext();

  return (
    <>
      <div className="relative w-36">
        <div className="overflow-hidden w-36 h-36 rounded-3xl">
          <img
            src={item.image[0]}
            alt={item.title}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-1 mt-1">
          <div className="flex flex-col w-full gap-2">
            <span className="text-lg font-semibold leading-tight">
              {item.title}
            </span>
          </div>
          <span className="text-xl font-black text-green-700 price">
            ₹{item.price}
          </span>
        </div>
        <div className="absolute p-1 bg-red-600 rounded-full top-1 -right-2 h-max w-max">
          <X
            height={18}
            width={16}
            strokeWidth={3}
            color="white"
            onClick={() => removeItem(item.id)}
          />
        </div>
      </div>
    </>
  );
}
