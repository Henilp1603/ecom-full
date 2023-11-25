import {Badge, Button, Card, Heading, Inset, Text} from "@radix-ui/themes";
import React from "react";
import {useFilterContext} from "../../Contexts/FilterContext";
import {Link, useNavigate} from "react-router-dom";
import {useCartContext} from "../../Contexts/CartContext";
import { useCookies } from "react-cookie";

export default function ProductCard({item}) {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["token"]);

  const {addToCart} = useCartContext();

  const handleBuyNow = (
    item,
    selectedColor,
    selectedImg,
    selectedPrice,
    selectedSize
  ) => {
    addToCart(
      item._id,
      item,
      selectedColor,
      selectedImg,
      selectedPrice,
      selectedSize
    );
    navigate("/cart");
  };

  return (
    <>
      <div
        className="w-56 h-full transition-colors hover:bg-green-100/30 rounded-2xl"
        role="button"
      >
        <Link to={`/single-product/${item._id}`}>
          <div className="w-56 h-56 overflow-hidden rounded-2xl">
            <img
              src={item.colorsAndImg[0].image[0]}
              alt={item.title}
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </Link>
        <div className="flex flex-col w-full gap-2 mt-1">
          <div className="flex flex-col w-full gap-2">
            <span className="text-xl font-semibold leading-tight">
              {item.title}
            </span>
            <div className="flex items-center gap-x-1">
              {item.category.map((cat) => (
                <Badge
                  className="w-max"
                  variant="outline"
                  size="1"
                  name="category"
                  value={cat}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <span className="text-sm font-semibold line-through mrp">
              ₹{item.MRP}
            </span>
            <span className="text-3xl font-bold price">
              ₹{item.discountedPrice[0].price}
            </span>
          </div>
          <div className="flex items-center my-1 gap-x-2">
            <Button
              className=""
              onClick={() =>

                cookie.token && handleBuyNow(
                  item,
                  item.colorsAndImg[0].color,
                  item.colorsAndImg[0].image,
                  item.discountedPrice[0].price,
                  item.discountedPrice[0].size
                )
              }
            >
              Buy Now
            </Button>
           
            <Button
              variant="outline"
              onClick={() =>
                cookie.token && addToCart(
                  item._id,
                  item,
                  item.colorsAndImg[0].color,
                  item.colorsAndImg[0].image,
                  item.discountedPrice[0].price,
                  item.discountedPrice[0].size
                )
              }
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
